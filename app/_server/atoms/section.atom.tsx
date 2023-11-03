'use server';

import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { twMerge } from 'tailwind-merge';

const baseStyle = 'pt-24 pb-32 relative flex flex-col justify-center items-center h-full gap-y-5';

const Section = async ({ className, ...rest }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
  <section className={twMerge(baseStyle, className)} {...rest} />
);

export default Section;
