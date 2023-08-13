'use client';

import 'client-only';

import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import useBoolean from '../../_hooks/_use-boolean/use-boolean.hook';

interface FadingTextProps {
  children: string;
  disabled?: boolean;
  ms: number;
}

export default function FadingText(props: FadingTextProps) {
  const { children, disabled = false, ms } = props;
  const [loaded, { turnOff: unload, turnOn: load }] = useBoolean(false);

  useEffect(() => {
    const timeout = setTimeout(load, 200);

    return () => clearTimeout(timeout);
  }, [load]);

  useEffect(() => {
    if (disabled) return;

    const timeout = setTimeout(unload, ms - 200);

    return () => clearTimeout(timeout);
  }, [unload, ms, disabled]);

  return (
    <code className={twMerge('font-bold text-transparent duration-300 blur-xl', loaded && 'blur-none text-blue-500')}>
      {children}
    </code>
  );
}
