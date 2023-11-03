'use client';

import type { ButtonVariants } from '~/_common/variants/button.variant';

import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { cn } from '~/_common/utils/classname.util';
import buttonVariants from '~/_common/variants/button.variant';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export default Button;
