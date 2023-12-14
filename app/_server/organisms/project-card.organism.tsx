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
import Card from '../molecules/card.molecule';

type ProjectCardProps = Project;

export default async function ProjectCard(project: ProjectCardProps) {
  const { id, links, name, summary, techStacks, thumbnail } = project;

  return (
    <Card
      className={tw`flex w-80 flex-col overflow-hidden`}
      id={generateProjectCardId(id)}
      key={generateProjectCardId(id)}
      role="article"
    >
      <Card.Header className={tw`p-0 pb-6`}>
        <Image
          alt={thumbnail.filename}
          blurDataURL={thumbnail.blurDataURL}
          className={tw`h-[400px] object-cover`}
          height={thumbnail.height}
          loading="lazy"
          placeholder="blur"
          priority={false}
          src={thumbnail.url}
          style={{ aspectRatio: thumbnail.aspectRatio }}
          width={thumbnail.width}
        />
      </Card.Header>
      <Card.Content className={tw`flex w-full grow flex-col gap-y-2`}>
        <Card.Title className={tw`relative text-3xl`}>
          {links.website ? (
            <a className={cn(links.website && tw`hover:underline`)} href={links.website} target="_blank">
              {name}
              <LucideIcon className={tw`mb-3 ml-1 inline h-3 w-3`} name="external-link" />
            </a>
          ) : (
            <p className={cn(links.website && tw`hover:underline`)}>{name}</p>
          )}
        </Card.Title>
        <Card.Description>{summary}</Card.Description>
        <div className={tw`flex flex-row flex-wrap gap-1`}>
          {techStacks.map((tech) => (
            <Badge className={tw`gap-x-1`} key={tech.id} variant="secondary">
              <Icon className={tw`h-3 w-3`} name={Icon.getIconName(tech.icon)} />
              {tech.name}
            </Badge>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className={tw`flex-wrap gap-1`}>
        {links.github && (
          <a
            aria-label="Github"
            className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
            href={links.github}
            target="_blank"
          >
            <LucideIcon name="github" />
          </a>
        )}
        {links.appStore && (
          <a
            aria-label="Apple App Store"
            className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
            href={links.appStore}
            target="_blank"
          >
            <LucideIcon name="apple" />
          </a>
        )}
        {links.playStore && (
          <a
            aria-label="Google Play Store"
            className={cn(buttonVariants({ size: 'icon', variant: 'link' }), tw`h-6 w-6 hover:text-blue-600`)}
            href={links.playStore}
            target="_blank"
          >
            <LucideIcon name="play" />
          </a>
        )}
      </Card.Footer>
    </Card>
  );
}
