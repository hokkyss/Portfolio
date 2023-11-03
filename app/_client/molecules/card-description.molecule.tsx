'use client';

import 'client-only';

import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cardDescription } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p className={cn(cardDescription, className)} ref={ref} {...props} />,
);
CardDescription.displayName = 'CardDescription';

export default CardDescription;
