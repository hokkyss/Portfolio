import { CodeIcon } from '@phosphor-icons/react';
import type { TechStackModel } from '../../lib/tech-stacks/models/tech-stack.model';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

interface TechStackChipProps {
  className?: string;
  techStack: TechStackModel;
}

/**
 *
 * @param root0
 * @param root0.className
 * @param root0.techStack
 */
export default function TechStackChip({ className, techStack }: TechStackChipProps) {
  return (
    <span
      className={cn(
        tw`inline-flex h-fit w-fit flex-row gap-x-2 rounded border bg-linear-to-tl p-2 transition hover:-translate-y-0.5 hover:scale-105`,
        tw`border-[currentColor]`,
        tw`from-slate-600 to-slate-300`,
        tw`dark:from-slate-800 dark:to-slate-600/60`,
        className,
      )}
    >
      <CodeIcon />
      {techStack.name}
    </span>
  );
}
