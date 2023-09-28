import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const baseStyle = 'pt-24 pb-32 relative flex flex-col justify-center items-center h-full gap-y-5';

const Section = forwardRef<HTMLElement, DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>(
  ({ className, ...rest }, ref) => <section className={twMerge(baseStyle, className)} {...rest} ref={ref} />,
);

export default Section;
