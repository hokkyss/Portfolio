'use server';

import 'server-only';

import type { TechStack } from '~/_common/models/tech-stack.model';

import { cn, tw } from '~/_common/utils/classname.util';

import Icon from './icon.atom';

interface TechStackChipProps {
  className?: string;
  techStack: TechStack;
}

const TechStackChip = async (props: TechStackChipProps) => {
  const { className, techStack } = props;

  return (
    <span
      className={cn(
        tw`w-fit h-fit bg-gradient-to-tl from-slate-600 to-slate-300 inline-flex flex-row gap-x-2 border p-2 rounded transition text-black dark:text-white border-black dark:border-white hover:scale-105 hover:-translate-y-0.5`,
        className,
      )}
    >
      <Icon name={Icon.getIconName(techStack.icon)} />
      {techStack.name}
    </span>
  );
};

export default TechStackChip;
