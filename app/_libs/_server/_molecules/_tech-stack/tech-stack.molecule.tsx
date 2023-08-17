import 'server-only';

import type { TechStack } from '@/app/_libs/_common/_models/tech-stack.model';

import styled from '@/app/_libs/_common/_utils/_styled/styled.util';

import TechStackChip from '../../_atoms/_tech-stack-chip/tech-stack-chip.atom';

interface TechStackProps {
  techStacks: TechStack[];
  title: string;
}

const TechStackContainer = styled('div')(
  'relative w-full border rounded-lg px-3 pb-2 pt-5 flex flex-col transition-all duration-300',
  'border-black dark:border-white',
  'hover:border-fuchsia-700 hover:text-fuchsia-700 hover:dark:border-orange-400 hover:dark:text-orange-400',
  'flex flex-row flex-wrap gap-x-2 gap-y-2 justify-center',
);
const TechStackGroupTitle = styled('h1')('absolute px-2 -top-[14px] backdrop-blur-xl text-xl');

export default async function TechStack(props: TechStackProps) {
  const { techStacks, title } = props;

  return (
    <TechStackContainer>
      <TechStackGroupTitle>{title}</TechStackGroupTitle>
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
      {techStacks.map((techStack) => (
        <TechStackChip key={techStack.name} techStack={techStack} />
      ))}
    </TechStackContainer>
  );
}
