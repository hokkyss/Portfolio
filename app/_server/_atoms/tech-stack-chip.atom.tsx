import 'server-only';

import type { TechStack } from '~/_common/_models/tech-stack.model';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from './icon.atom';

interface TechStackChipProps {
  className?: string;
  techStack: TechStack;
}

const containerStyle =
  'w-fit h-fit bg-gradient-to-tl from-slate-600 to-slate-300 inline-flex flex-row gap-x-2 border p-2 rounded transition text-black dark:text-white border-black dark:border-white hover:scale-105 hover:-translate-y-0.5';

const TechStackChip = memo<TechStackChipProps>(
  async (props) => {
    const { className, techStack } = props;

    const ChipIcon = techStack.icon in Icon ? Icon[techStack.icon] : Icon.default;

    return (
      <span className={twMerge(containerStyle, className)}>
        <ChipIcon title={techStack.icon in Icon ? undefined : 'Icon Not Found'} />
        {techStack.name}
      </span>
    );
  },
  (prev, next) => prev.className === next.className && prev.techStack.name === next.techStack.name,
);

export default TechStackChip;
