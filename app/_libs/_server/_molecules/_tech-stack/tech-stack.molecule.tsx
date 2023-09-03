import 'server-only';

import type { TechStack as TechStackModel } from '~/_common/_models/tech-stack.model';

import { memo } from 'react';

import TechStackChip from '../../_atoms/_tech-stack-chip/tech-stack-chip.atom';

interface TechStackProps {
  techStacks: TechStackModel[];
  title: string;
}

import styles from './tech-stack.module.css';

const TechStack = memo<TechStackProps>(async (props) => {
  const { techStacks, title } = props;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {techStacks.map((techStack) => (
        <TechStackChip className={styles.chip} key={techStack.name} techStack={techStack} />
      ))}
    </div>
  );
});

export default TechStack;
