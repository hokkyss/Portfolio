import type { CSSProperties, Ref } from 'react';

import { useEffect } from 'react';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

import useBoolean from './use-boolean.hook';

interface FadingTextProps {
  children: string;
  className?: string;
  delay: number;
  disabled?: boolean;
  ms: number;
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
}

/**
 *
 * @param props
 */
export default function FadingText(props: FadingTextProps) {
  const { children, delay, disabled = false, ms, ref } = props;
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
      className={cn(
        tw`font-bold text-transparent blur-xl duration-500`,
        loaded && tw`text-blue-500 blur-none selection:bg-white/80`,
      )}
      ref={ref}
    >
      {children}
    </code>
  );
};
