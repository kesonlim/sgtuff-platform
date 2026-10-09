import * as React from 'react';
import { cn } from '@/lib/utils';

export const fieldBase =
  'w-full rounded-sm border-[1.5px] border-input bg-background px-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/80 transition-colors hover:border-foreground focus-visible:border-foreground aria-[invalid=true]:border-primary-strong disabled:opacity-60';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(fieldBase, 'h-12', className)} {...props} />,
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldBase, 'min-h-32 py-3', className)} {...props} />
  ),
);
Textarea.displayName = 'Textarea';

const NativeSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => <select ref={ref} className={cn(fieldBase, 'h-12 pr-8', className)} {...props} />,
);
NativeSelect.displayName = 'NativeSelect';

export { Input, Textarea, NativeSelect };
