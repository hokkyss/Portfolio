'use client';

import 'client-only';

import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { card } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <article className={cn(card, className)} ref={ref} {...props} />
));
Card.displayName = 'Card';

export default Card;
