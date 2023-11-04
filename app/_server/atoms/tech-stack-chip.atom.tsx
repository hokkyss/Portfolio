'use server';

import 'server-only';

import type { TechStack } from '~/_common/models/tech-stack.model';

import { cn, tw } from '~/_common/utils/classname.util';

import Icon from './icon.atom';

interface TechStackChipProps {
  className?: string;
  techStack: TechStack;
}

export default async function TechStackChip(props: TechStackChipProps) {
  const { className, techStack } = props;

  return (
    <span
      className={cn(
        tw`inline-flex h-fit w-fit flex-row gap-x-2 rounded border border-black bg-gradient-to-tl from-slate-600 to-slate-300 p-2 text-black transition hover:-translate-y-0.5 hover:scale-105 dark:border-white dark:text-white`,
        className,
      )}
    >
      <Icon name={Icon.getIconName(techStack.icon)} />
      {techStack.name}
    </span>
  );
}
