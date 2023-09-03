'use client';

import 'client-only';

import type { CSSProperties } from 'react';

import { forwardRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useBoolean from '../../_hooks/_use-boolean/use-boolean.hook';

import styles from './fading-text.module.css';

interface FadingTextProps {
  children: string;
  className?: string;
  delay: number;
  disabled?: boolean;
  ms: number;
  style?: CSSProperties;
}

const FadingText = forwardRef<HTMLElement, FadingTextProps>((props, ref) => {
  const { children, delay, disabled = false, ms } = props;
  const [loaded, { turnOff: unload, turnOn: load }] = useBoolean(false);

  useEffect(() => {
    const timeout = setTimeout(load, delay);

    return () => clearTimeout(timeout);
  }, [load, delay]);

  useEffect(() => {
    if (disabled) return;

    const timeout = setTimeout(unload, ms - delay);

    return () => clearTimeout(timeout);
  }, [unload, ms, disabled, delay]);

  return (
    <code className={twMerge(styles.text, loaded && styles['appeared-text'])} ref={ref}>
      {children}
    </code>
  );
});

export default FadingText;
