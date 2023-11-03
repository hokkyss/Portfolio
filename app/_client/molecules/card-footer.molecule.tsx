'use client';

import 'client-only';

import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cardFooter } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={cn(cardFooter, className)} ref={ref} {...props} />
));
CardFooter.displayName = 'CardFooter';

export default CardFooter;
