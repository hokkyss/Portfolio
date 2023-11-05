import type { Project } from '~/_common/models/project.model';

import Image from 'next/image';

import { generateProjectCardId } from '~/_common/models/project.model';
import buttonVariants from '~/_common/styles/button.style';
import { cn, tw } from '~/_common/utils/classname.util';

import Badge from '../atoms/badge.atom';
import Icon from '../atoms/icon.atom';
import LucideIcon from '../atoms/lucide-icon.atom';
import Card from '../molecules/card.molecule';

type ProjectCardProps = Project;

export default async function ProjectCard(project: ProjectCardProps) {
  return (
    <Card
      className={tw`flex w-80 flex-col overflow-hidden`}
      id={generateProjectCardId(project.id)}
      key={generateProjectCardId(project.id)}
      role="article"
    >
      <Card.Header className={tw`p-0 pb-6`}>
        <Image alt="" className={tw`h-[400px] object-cover`} loading="lazy" priority={false} src={project.thumbnail} />
      </Card.Header>
      <Card.Content className={tw`flex w-full grow flex-col gap-y-2`}>
        <Card.Title className={tw`relative text-3xl`}>
          <a className={cn(project.links.website && tw`hover:underline`)} href={project.links.website} target="_blank">
            {project.name}
            {project.links.website && <LucideIcon className={tw`mb-3 ml-1 inline h-3 w-3`} name="external-link" />}
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
  );
}
