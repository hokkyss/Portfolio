import 'server-only';

import type { TechStack } from '@/app/_libs/_common/_models/tech-stack.model';

import styled from '@/app/_libs/_common/_utils/_styled/styled.util';

import Icon from '../_icons/icon.atom';

interface TechStackChipProps {
  techStack: TechStack;
}

const ChipContainer = styled('span')(
  'w-fit h-fit',
  'bg-gradient-to-tl from-slate-500 to-slate-300',
  'inline-flex flex-row gap-x-2 border p-2 rounded-md transition',
  'text-black dark:text-white',
  'border-black dark:border-white',
  'hover:scale-110 hover:-translate-y-0.5',
);

export default async function TechStackChip(props: TechStackChipProps) {
  const { techStack } = props;

  const ChipIcon = techStack.icon in Icon ? Icon[techStack.icon] : Icon.default;

  return (
    <ChipContainer>
      <ChipIcon />
      {techStack.name}
    </ChipContainer>
  );
}