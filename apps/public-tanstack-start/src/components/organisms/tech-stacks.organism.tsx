import type { TechModel } from '../../lib/tech-stacks/models/tech.model';

import TechStack from '../molecules/tech-stack.molecule';

interface TechStacksProps {
  tech: TechModel[];
}

/**
 *
 * @param root0
 * @param root0.tech
 */
export default function TechStacks({ tech }: TechStacksProps) {
  return (
    <>
      {tech.map((t) => (
        <TechStack key={t.id} techStacks={t.techStacks} title={t.name} />
      ))}
    </>
  );
}
