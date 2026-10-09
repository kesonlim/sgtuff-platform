import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, NativeSelect, Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type Field = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: string[];
  autoComplete?: string;
  required?: boolean;
  wide?: boolean;
};

type Props = {
  endpoint: '/api/join' | '/api/contact' | '/api/collaborate';
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  footnote?: string;
  turnstileSiteKey: string;
  className?: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

export default function LeadForm(props: Props) {
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [formError, setFormError] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);
  const id = React.useId();

  React.useEffect(() => {
    if (document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) return;
    const s = document.createElement('script');
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    for (const f of props.fields) {
      const v = String(data.get(f.name) ?? '').trim();
      if (f.required !== false && !v) next[f.name] = `Please enter your ${f.label.toLowerCase()}.`;
      else if (f.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = 'That email doesn’t look right.';
      else if (f.type === 'tel' && v && v.replace(/\D/g, '').length < 8) next[f.name] = 'Please enter at least 8 digits.';
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const found = validate(data);
    setErrors(found);
    setFormError('');
    if (Object.keys(found).length) {
      const first = props.fields.find((f) => found[f.name]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(props.endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Something went wrong.');
      setStatus('success');
    } catch (err) {
      setFormError(
        `${err instanceof Error ? err.message : 'Something went wrong.'} Please try again, or email info@sgtuff.org.sg.`,
      );
      setStatus('error');
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  }

  return (
    <div className={cn('relative', props.className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex flex-col items-start gap-3 py-6"
          >
            <CheckCircle2 className="size-10 text-primary" aria-hidden />
            <h3 className="font-display text-2xl font-extrabold">{props.successTitle}</h3>
            <p className="text-body">{props.successBody}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2"
          >
            {props.fields.map((f) => {
              const fid = `${id}-${f.name}`;
              const err = errors[f.name];
              const common = {
                id: fid,
                name: f.name,
                placeholder: f.placeholder,
                autoComplete: f.autoComplete,
                'aria-invalid': err ? true : undefined,
                'aria-describedby': err ? `${fid}-err` : undefined,
                disabled: status === 'submitting',
              };
              return (
                <div key={f.name} className={cn('flex flex-col gap-1.5', (f.wide || f.type === 'textarea') && 'sm:col-span-2')}>
                  <Label htmlFor={fid}>
                    {f.label}
                    {f.required === false && <span className="font-normal text-muted-foreground"> (optional)</span>}
                  </Label>
                  {f.type === 'textarea' ? (
                    <Textarea {...common} />
                  ) : f.type === 'select' ? (
                    <NativeSelect {...common} defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </NativeSelect>
                  ) : (
                    <Input {...common} type={f.type ?? 'text'} />
                  )}
                  {err && (
                    <p id={`${fid}-err`} className="text-[13px] font-semibold text-primary-strong">
                      {err}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Honeypot: hidden from people, often filled by bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
              <label>
                Leave this empty
                <input type="text" name="company_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="cf-turnstile sm:col-span-2" data-sitekey={props.turnstileSiteKey} data-size="flexible" />

            {formError && (
              <p role="alert" className="flex items-start gap-2 rounded-sm bg-primary/10 p-3 text-[15px] font-semibold text-primary-strong sm:col-span-2">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {formError}
              </p>
            )}

            <Button type="submit" size="lg" className="sm:col-span-2" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                props.submitLabel
              )}
            </Button>
            {props.footnote && <p className="text-[13px] text-muted-foreground sm:col-span-2">{props.footnote}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
