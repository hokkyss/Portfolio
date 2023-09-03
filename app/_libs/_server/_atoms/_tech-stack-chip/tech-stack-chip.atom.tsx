import 'server-only';

import type { TechStack } from '~/_common/_models/tech-stack.model';

import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../_icons/icon.atom';

import styles from './tech-stack-chip.module.css';

interface TechStackChipProps {
  className?: string;
  techStack: TechStack;
}

const TechStackChip = memo<TechStackChipProps>(async (props) => {
  const { className, techStack } = props;

  const ChipIcon = techStack.icon in Icon ? Icon[techStack.icon] : Icon.default;

  return (
    <span className={twMerge(styles.container, className)}>
      <ChipIcon />
      {techStack.name}
    </span>
  );
});

export default TechStackChip;
