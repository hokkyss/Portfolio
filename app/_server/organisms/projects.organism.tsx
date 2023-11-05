'use server';

import 'server-only';

import type { Project } from '~/_common/models/project.model';

import Image from 'next/image';

import { generateProjectCardId } from '~/_common/models/project.model';
import buttonVariants from '~/_common/styles/button.style';
import { cn, tw } from '~/_common/utils/classname.util';

import Badge from '../atoms/badge.atom';
import Icon from '../atoms/icon.atom';
import LucideIcon from '../atoms/lucide-icon.atom';
import Section from '../atoms/section.atom';
import Card from '../molecules/card.molecule';

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
      <div className={tw`flex w-full flex-row flex-wrap justify-center gap-1`}>
        {projects.map((project) => (
          // ProjectCard
          <Card
            className={tw`flex w-80 flex-col overflow-hidden`}
            id={generateProjectCardId(project.id)}
            key={generateProjectCardId(project.id)}
            role="article"
          >
            <Card.Header className={tw`p-0 pb-6`}>
              <Image
                alt=""
                className={tw`h-[400px] object-cover`}
                loading="lazy"
                priority={false}
                src={project.thumbnail}
              />
            </Card.Header>
            <Card.Content className={tw`flex w-full grow flex-col gap-y-2`}>
              <Card.Title className={tw`relative text-3xl`}>
                <a
                  className={cn(project.links.website && tw`hover:underline`)}
                  href={project.links.website}
                  target="_blank"
                >
                  {project.name}
                  {project.links.website && (
                    <LucideIcon className={tw`mb-3 ml-1 inline h-3 w-3`} name="external-link" />
                  )}
                </a>
              </Card.Title>
              <Card.Description>{project.summary}</Card.Description>
              <div className={tw`flex flex-row flex-wrap gap-1`}>
                {project.techStacks.map((tech) => (
                  <Badge className={tw`gap-x-1`} key={tech} variant="secondary">
                    <Icon className={tw`h-3 w-3`} name={Icon.getIconName(tech)} />
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card.Content>
            <Card.Footer className={tw`flex-wrap gap-1`}>
              {project.links.github && (
                <a
                  className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
                  href={project.links.github}
                  target="_blank"
                >
                  <LucideIcon name="github" />
                </a>
              )}
              {project.links.appStore && (
                <a
                  className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
                  href={project.links.appStore}
                  target="_blank"
                >
                  <LucideIcon name="apple" />
                </a>
              )}
              {project.links.playStore && (
                <a
                  className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
                  href={project.links.playStore}
                  target="_blank"
                >
                  <LucideIcon name="play" />
                </a>
              )}
            </Card.Footer>
          </Card>
        ))}
      </div>
    </Section>
  );
}
