// Step 2 of the Decap CMS GitHub login: swap GitHub's code for a token and hand
// it back to the /admin window using Decap's postMessage handshake.
interface Env {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

function reply(status: 'success' | 'error', content: object, origin: string) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const html = `<!doctype html><html><body><p>${status === 'success' ? 'Logged in. You can close this window.' : 'Login failed.'}</p><script>
(function () {
  var origin = ${JSON.stringify(origin)};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(${JSON.stringify(message)}, origin);
    window.removeEventListener('message', receive);
  }
  window.addEventListener('message', receive);
  window.opener && window.opener.postMessage('authorizing:github', origin);
})();
</script></body></html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'set-cookie': 'cms_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0',
    },
  });
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('cookie') ?? '';
  const expected = /(?:^|;\s*)cms_oauth_state=([^;]+)/.exec(cookie)?.[1];

  if (!code || !state || state !== expected) {
    return reply('error', { message: 'Invalid login state. Please try again.' }, url.origin);
  }

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code }),
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) {
    return reply('error', { message: data.error_description ?? 'GitHub login failed.' }, url.origin);
  }
  return reply('success', { token: data.access_token, provider: 'github' }, url.origin);
};
