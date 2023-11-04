'use server';

import 'server-only';

import type { TechStack as TechStackModel } from '~/_common/models/tech-stack.model';

import { tw } from '~/_common/utils/classname.util';

import TechStackChip from '../atoms/tech-stack-chip.atom';

interface TechStackProps {
  techStacks: TechStackModel[];
  title: string;
}
export default async function TechStack(props: TechStackProps) {
  const { techStacks, title } = props;

  return (
    <div
      className={tw`relative flex w-full flex-row flex-wrap justify-center gap-2 rounded-lg border border-black px-3 pb-2 pt-5 transition-all duration-300 hover:border-blue-700 hover:text-blue-700 dark:border-white selection:dark:bg-green-300 selection:dark:text-black hover:dark:border-green-300 hover:dark:text-green-300`}
    >
      <h1 className={tw`absolute -top-[14px] px-2 text-xl backdrop-blur-xl`}>{title}</h1>
      {techStacks.map((techStack) => (
        <TechStackChip
          className={tw`hover:text-blue-700 hover:dark:fill-green-300 hover:dark:text-green-300`}
          key={techStack.name}
          techStack={techStack}
        />
      ))}
    </div>
  );
}
