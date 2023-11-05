'use server';

import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { cn, tw } from '~/_common/utils/classname.util';

type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export default async function Section(props: SectionProps) {
  const { className, ...rest } = props;

  return (
    <section
      className={cn(tw`relative flex h-full flex-col items-center justify-center gap-y-5 pb-32 pt-24`, className)}
      {...rest}
    />
  );
}
