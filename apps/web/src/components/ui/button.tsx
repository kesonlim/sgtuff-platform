import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const baseVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-bold no-underline transition-colors disabled:pointer-events-none disabled:bg-border disabled:text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-strong hover:text-primary-foreground',
        outline: 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background',
        'outline-inverse': 'border-2 border-background text-background hover:bg-background hover:text-foreground',
        ghost: 'text-foreground hover:bg-muted hover:text-foreground',
      },
      size: {
        sm: 'h-11 px-4 text-[15px]',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-7 text-[17px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

/** Class names for a button look; merged so a passed `className` can override (e.g. `hidden`). */
const buttonVariants = (props?: Parameters<typeof baseVariants>[0]) => cn(baseVariants(props));

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
