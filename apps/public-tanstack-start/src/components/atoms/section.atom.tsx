import type { HTMLAttributes } from 'react';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

type SectionProps = HTMLAttributes<HTMLElement>;

/**
 *
 * @param root0
 * @param root0.className
 */
export default function Section({ className, ...rest }: SectionProps) {
  return (
    <section
      className={cn(
        tw`relative flex h-full flex-col items-center justify-center gap-y-5 pb-32 pt-24`,
        className,
      )}
      {...rest}
    />
  );
}
