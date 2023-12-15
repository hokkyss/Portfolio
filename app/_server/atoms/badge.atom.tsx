'use server';

import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import type { BadgeVariants } from '~/_common/styles/badge.style';

import badgeVariants from '~/_common/styles/badge.style';
import { cn } from '~/_common/utils/classname.util';

export interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, BadgeVariants {}

export default async function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
