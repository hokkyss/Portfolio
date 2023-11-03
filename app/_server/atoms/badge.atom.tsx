'use server';

import 'server-only';

import type { BadgeVariants } from '~/_common/styles/badge.style';

import * as React from 'react';

import badgeVariants from '~/_common/styles/badge.style';
import { cn } from '~/_common/utils/classname.util';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, BadgeVariants {}

export default async function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
