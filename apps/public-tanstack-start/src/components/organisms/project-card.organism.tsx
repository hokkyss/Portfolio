import type { ProjectModel } from '../../lib/projects/models/project.model';

import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

import { AppleLogoIcon, GithubLogoIcon, GooglePlayLogoIcon, LinkIcon } from '@phosphor-icons/react';
import { generateProjectCardId } from '../../lib/projects/models/project.model';
import Card from '../molecules/card.molecule';

type ProjectCardProps = ProjectModel;

/**
 *
 * @param project
 */
export default function ProjectCard(project: ProjectCardProps) {
  const { id, links, name, summary, techStacks, thumbnail } = project;

  return (
    <Card
      className={tw`flex w-80 flex-col overflow-hidden`}
      id={generateProjectCardId(id)}
      key={generateProjectCardId(id)}
      role="article"
    >
      <Card.Header className={tw`p-0 pb-6`}>
        {/* TODO: migrate image — was next/image with blurDataURL, src={thumbnail.url}, height/width/aspectRatio */}
      </Card.Header>
      <Card.Content className={tw`flex w-full grow flex-col gap-y-2`}>
        <Card.Title className={tw`relative text-3xl`}>
          {links.website
            ? (
                <a className={cn(links.website && tw`hover:underline`)} href={links.website} target="_blank">
                  {name}
                  <LinkIcon className={tw`mb-3 ml-1 inline h-3 w-3`} />
                </a>
              )
            : (
                <p>{name}</p>
              )}
        </Card.Title>
        <Card.Description>{summary}</Card.Description>
        <div className={tw`flex flex-row flex-wrap gap-1`}>
          {techStacks.map((tech) => (
            <Badge className={tw`gap-x-1`} key={tech.id} variant="secondary">
              {tech.name}
            </Badge>
          ))}
        </div>
      </Card.Content>
      <Card.Footer className={tw`flex-wrap gap-1`}>
        {links.github && (
          <Button
            className={tw`h-6 w-6 hover:text-blue-600`}
            nativeButton={false}
            render={(
              <a aria-label="Github" href={links.github} target="_blank">
                <GithubLogoIcon />
              </a>
            )}
            size="icon"
            variant="link"
          />
        )}
        {links.appStore && (
          <Button
            className={tw`h-6 w-6 hover:text-blue-600`}
            nativeButton={false}
            render={(
              <a aria-label="Apple App Store" href={links.appStore} target="_blank">
                <AppleLogoIcon />
              </a>
            )}
            size="icon"
            variant="link"
          />
        )}
        {links.playStore && (
          <Button
            className={tw`h-6 w-6 hover:text-blue-600`}
            nativeButton={false}
            render={(
              <a aria-label="Google Play Store" href={links.playStore} target="_blank">
                <GooglePlayLogoIcon />
              </a>
            )}
            size="icon"
            variant="link"
          />
        )}
      </Card.Footer>
    </Card>
  );
}
