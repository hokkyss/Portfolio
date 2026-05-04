import { ArrowSquareOutIcon, GithubLogoIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Card from '@portfolio/design-system/card';
import CardContent from '@portfolio/design-system/card-content';
import CardDescription from '@portfolio/design-system/card-description';
import CardFooter from '@portfolio/design-system/card-footer';
import CardHeader from '@portfolio/design-system/card-header';
import CardTitle from '@portfolio/design-system/card-title';
import tw from '@portfolio/design-system/tw';
import type { ProjectModel } from '../../lib/projects/models/project.model';
import ScreenshotFrame from '../atoms/screenshot-frame.atom';

interface ProjectCardProps {
  project: ProjectModel;
}

/**
 * Project card showing a live screenshot preview, title, description, tech stacks, and links.
 * @param root0
 * @param root0.project
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { description, links, name, summary, techStacks } = project;

  return (
    <Card
      className={tw`group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl`}
      id={`project-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Live screenshot */}
      <ScreenshotFrame title={name} url={links.website} />

      {/* Content */}
      <CardHeader className={tw`pb-3`}>
        <div className={tw`flex items-start justify-between gap-2`}>
          <CardTitle className={tw`text-base`}>{name}</CardTitle>
          {links.website && (
            <a
              aria-label={`Open ${name} live site`}
              className={tw`text-muted-foreground transition-colors hover:text-primary mt-1`}
              href={links.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ArrowSquareOutIcon size={16} />
            </a>
          )}
        </div>
        <CardDescription className={tw`text-sm`}>
          {summary || description}
        </CardDescription>
      </CardHeader>

      <CardContent className={tw`mt-auto flex flex-col gap-3 pb-3`}>
        {/* Tech stacks */}
        <div className={tw`flex flex-wrap gap-1.5`}>
          {techStacks.map((stack) => (
            <Badge key={stack.id} variant="secondary">
              {stack.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className={tw`flex items-center gap-3 border-t border-border pt-3 pb-3`}>
        {links.github && (
          <Button
            className={tw`gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground h-auto p-0`}
            nativeButton={false}
            render={(
              <a
                aria-label={`${name} GitHub repository`}
                href={links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubLogoIcon size={14} />
                Source
              </a>
            )}
            variant="ghost"
          >
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
