import { CodeIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import type { TechStackModel } from '../../lib/tech-stacks/models/tech-stack.model';

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
    <Badge
      className={cn(
        tw`inline-flex h-fit w-fit flex-row gap-x-2 p-2 transition hover:-translate-y-0.5 hover:scale-105`,
        tw`border-[currentColor]`,
        className,
      )}
      variant="secondary"
    >
      <CodeIcon />
      {techStack.name}
    </Badge>
  );
}
