'use server';

import 'server-only';

import type { TechStack as TechStackModel } from '~/_common/models/tech-stack.model';

import { cn, tw } from '~/_common/utils/classname.util';

import TechStackChip from '../atoms/tech-stack-chip.atom';

interface TechStackProps {
  techStacks: TechStackModel[];
  title: string;
}
export default async function TechStack(props: TechStackProps) {
  const { techStacks, title } = props;

  return (
    <div
      className={cn(
        'group',
        tw`relative flex w-full flex-row flex-wrap justify-center gap-2 rounded-lg border px-3 pb-2 pt-5 transition-all duration-300`,
        tw`bg-transparent hover:bg-blue-800/20`,
        tw`border-black dark:border-white/80 hover:dark:border-white`,
        tw`selection:dark:bg-gray-600`,
      )}
    >
      <h1
        className={cn(
          tw`absolute -top-[14px] px-2 text-xl backdrop-blur-xl`,
          tw`dark:text-white/80`,
          tw`dark:group-hover:text-white`,
        )}
      >
        {title}
      </h1>
      {techStacks.map((techStack) => (
        <TechStackChip
          className={cn(
            tw`dark:border-white/80 dark:text-white/80`,
            tw`dark:group-hover:border-white dark:group-hover:text-white`,
          )}
          key={techStack.name}
          techStack={techStack}
        />
      ))}
    </div>
  );
}
