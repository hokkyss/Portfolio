import tw from '@portfolio/design-system/tw';
import { ArrowSquareOutIcon, GithubLogoIcon } from '@phosphor-icons/react';
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
    <article
      className={tw`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl`}
      id={`project-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Live screenshot */}
      <ScreenshotFrame title={name} url={links.website} />

      {/* Content */}
      <div className={tw`flex flex-1 flex-col gap-3 p-5`}>
        <div className={tw`flex items-start justify-between gap-2`}>
          <h3 className={tw`text-base font-semibold text-foreground`}>{name}</h3>
          {links.website && (
            <a
              aria-label={`Open ${name} live site`}
              className={tw`text-muted-foreground transition-colors hover:text-primary`}
              href={links.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ArrowSquareOutIcon size={16} />
            </a>
          )}
        </div>

        <p className={tw`text-sm text-muted-foreground`}>{summary || description}</p>

        {/* Tech stacks */}
        <div className={tw`mt-auto flex flex-wrap gap-1.5 pt-2`}>
          {techStacks.map((stack) => (
            <span
              className={tw`rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground`}
              key={stack.id}
            >
              {stack.name}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className={tw`flex items-center gap-3 border-t border-border pt-3`}>
          {links.github && (
            <a
              aria-label={`${name} GitHub repository`}
              className={tw`flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground`}
              href={links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GithubLogoIcon size={14} />
              Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
