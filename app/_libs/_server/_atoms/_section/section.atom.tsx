import 'server-only';

import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './section.module.css';

const Section = forwardRef<HTMLElement, DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>>(
  ({ className, ...rest }, ref) => <section className={twMerge(styles.base, className)} {...rest} ref={ref} />,
);

export default Section;
