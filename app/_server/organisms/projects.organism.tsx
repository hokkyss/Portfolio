'use server';

import 'server-only';

import type { Project } from '~/_common/models/project.model';

import dynamic from 'next/dynamic';

import { generateProjectCardId } from '~/_common/models/project.model';
import { tw } from '~/_common/utils/classname.util';

import Section from '../atoms/section.atom';

const ProjectCard = dynamic(() => import('./project-card.organism'));

interface ProjectsProps {
  projects: Project[];
}

export default async function Projects(props: ProjectsProps) {
  const { projects } = props;

  return (
    <Section
      className={tw`h-fit min-h-screen w-screen items-start justify-normal gap-y-10 bg-gradient-to-b from-amber-950/60 to-red-600/80 px-8  dark:from-amber-950/60 dark:to-red-800/60 md:px-20`}
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
