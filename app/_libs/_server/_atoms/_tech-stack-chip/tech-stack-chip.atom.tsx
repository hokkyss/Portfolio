import 'server-only';

import type { TechStack } from '~/_common/_models/tech-stack.model';

import { memo } from 'react';

import styled from '~/_common/_utils/_styled/styled.util';

import Icon from '../_icons/icon.atom';

interface TechStackChipProps {
  className?: string;
  techStack: TechStack;
}

const ChipContainer = styled('span')(
  'w-fit h-fit',
  'bg-gradient-to-tl from-slate-600 to-slate-300',
  'inline-flex flex-row gap-x-2 border p-2 rounded-md transition',
  'text-black dark:text-white',
  'border-black dark:border-white',
  'hover:scale-105 hover:-translate-y-0.5',
);

const TechStackChip = memo<TechStackChipProps>(async (props) => {
  const { className, techStack } = props;

  const ChipIcon = techStack.icon in Icon ? Icon[techStack.icon] : Icon.default;

  return (
    <ChipContainer className={className}>
      <ChipIcon />
      {techStack.name}
    </ChipContainer>
  );
});

export default TechStackChip;
