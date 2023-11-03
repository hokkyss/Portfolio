'use client';

import 'client-only';

import type { CSSProperties } from 'react';

import { forwardRef, useEffect } from 'react';

import { cn, tw } from '~/_common/utils/classname.util';

import useBoolean from '../hooks/use-boolean.hook';

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
    <code
      className={cn(tw`text-transparent font-bold duration-500 blur-xl`, loaded && tw`blur-none text-blue-500`)}
      ref={ref}
    >
      {children}
    </code>
  );
});

export default FadingText;
