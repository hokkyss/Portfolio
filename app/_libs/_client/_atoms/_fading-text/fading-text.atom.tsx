'use client';

import 'client-only';

import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useBoolean from '../../_hooks/_use-boolean/use-boolean.hook';

interface FadingTextProps {
  children: string;
  delay: number;
  disabled?: boolean;
  ms: number;
}

export default function FadingText(props: FadingTextProps) {
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
    <code className={twMerge('font-bold text-transparent duration-500 blur-xl', loaded && 'blur-none text-blue-500')}>
      {children}
    </code>
  );
}
