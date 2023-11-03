'use server';

import 'server-only';

import type { TechStack as TechStackModel } from '~/_common/models/tech-stack.model';

import { tw } from '~/_common/utils/classname.util';

import TechStackChip from '../atoms/tech-stack-chip.atom';

interface TechStackProps {
  techStacks: TechStackModel[];
  title: string;
}

const TechStack = async (props: TechStackProps) => {
  const { techStacks, title } = props;

  return (
    <div
      className={tw`flex flex-row justify-center flex-wrap gap-2 relative w-full border border-black dark:border-white hover:border-blue-700 hover:dark:border-green-300 rounded-lg px-3 pb-2 pt-5 transition-all duration-300 hover:text-blue-700 hover:dark:text-green-300 selection:dark:text-black selection:dark:bg-green-300`}
    >
      <h1 className={tw`px-2 absolute -top-[14px] backdrop-blur-xl text-xl`}>{title}</h1>
      {techStacks.map((techStack) => (
        <TechStackChip
          className={tw`hover:text-blue-700 hover:dark:fill-green-300 hover:dark:text-green-300`}
          key={techStack.name}
          techStack={techStack}
        />
      ))}
    </div>
  );
};

export default TechStack;
