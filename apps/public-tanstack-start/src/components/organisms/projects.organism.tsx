import type { ProjectModel } from '../../lib/projects/models/project.model';

import tw from '@portfolio/design-system/tw';

import { generateProjectCardId } from '../../lib/projects/models/project.model';
import Section from '../atoms/section.atom';

import ProjectCard from './project-card.organism';

interface ProjectsProps {
  projects: ProjectModel[];
}

/**
 *
 * @param root0
 * @param root0.projects
 */
export default function Projects({ projects }: ProjectsProps) {
  return (
    <Section
      className={tw`h-fit min-h-screen w-screen items-start justify-normal gap-y-10 bg-linear-to-b from-amber-950/60 to-red-600/80 px-8 dark:from-amber-950/60 dark:to-red-800/60 md:px-20`}
    >
      <h1 className={tw`self-center text-4xl font-bold`}>Projects</h1>
      <div className={tw`flex w-full flex-row flex-wrap justify-center gap-2`}>
        {projects.map((project) => (
          <ProjectCard key={generateProjectCardId(project.id)} {...project} />
        ))}
      </div>
    </Section>
  );
}
