export interface Env {
  MAIL_TO: string;
  MAIL_FROM: string;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

type Spec = {
  subject: (data: Record<string, string>) => string;
  required: string[];
};

const MAX_FIELD = 5000;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

async function verifyTurnstile(token: string, secret: string, ip: string | null) {
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const out = (await res.json()) as { success: boolean };
  return out.success;
}

export function handler(spec: Spec): PagesFunction<Env> {
  return async ({ request, env }) => {
    let raw: Record<string, unknown>;
    try {
      raw = await request.json();
    } catch {
      return json({ error: 'Invalid request.' }, 400);
    }

    const data: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === 'string') data[k] = v.trim().slice(0, MAX_FIELD);
    }

    // Honeypot filled: pretend success so bots learn nothing
    if (data.company_url) return json({ ok: true });

    const token = data['cf-turnstile-response'];
    if (!token || !(await verifyTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP')))) {
      return json({ error: 'Spam check failed.' }, 400);
    }

    const missing = spec.required.filter((k) => !data[k]);
    if (missing.length) return json({ error: `Missing: ${missing.join(', ')}.` }, 400);
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ error: 'Invalid email.' }, 400);

    const rows = Object.entries(data)
      .filter(([k]) => k !== 'cf-turnstile-response' && k !== 'company_url')
      .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join('');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: [env.MAIL_TO],
        reply_to: data.email || undefined,
        subject: spec.subject(data),
        html: `<table>${rows}</table><p style="color:#666">Sent from ${escapeHtml(new URL(request.url).origin)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text());
      return json({ error: 'We couldn’t send your message.' }, 502);
    }
    return json({ ok: true });
  };
}
