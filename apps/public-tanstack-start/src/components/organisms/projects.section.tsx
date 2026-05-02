import { ArrowRightIcon } from '@phosphor-icons/react';
import tw from '@portfolio/design-system/tw';
import { Link } from '@tanstack/react-router';
import type { GetProjectResponseDto } from '../../lib/projects/dto/get-project.dto';
import ProjectCard from '../molecules/project-card.molecule';

interface ProjectsSectionProps {
  projects: GetProjectResponseDto;
}

/**
 * Featured projects grid on the homepage. Shows up to 6 projects
 * with a "View all" link to /projects.
 * @param root0
 * @param root0.projects
 */
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.slice(0, 6);

  return (
    <section className={tw`mx-auto max-w-6xl px-6 py-24`} id="projects">
      <div className={tw`mb-12 flex items-end justify-between`}>
        <div>
          <p className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}>
            $ ls ./projects
          </p>
          <h2 className={tw`text-4xl font-bold tracking-tight`}>Featured Projects</h2>
        </div>
        <Link
          className={tw`flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-70`}
          id="view-all-projects-link"
          to="/projects"
        >
          View all
          <ArrowRightIcon size={14} />
        </Link>
      </div>

      <div className={tw`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
