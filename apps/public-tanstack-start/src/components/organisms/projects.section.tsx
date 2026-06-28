import Badge from '@portfolio/design-system/badge';
import tw from '@portfolio/design-system/tw';
import { useSuspenseQuery } from '@tanstack/react-query';
import getProjectsQuery from '../../lib/projects/queries/get-projects.query';
import ProjectCard from '../molecules/project-card.molecule';

/**
 * Featured projects grid on the homepage. Shows up to 6 projects
 * with a "View all" link to /projects.
 * @param root0
 */
export default function ProjectsSection() {
  const { data: projects } = useSuspenseQuery(getProjectsQuery());

  return (
    <section className={tw`mx-auto w-full max-w-6xl px-6 py-24`} id="projects">
      <div className={tw`mb-12 flex items-end justify-between`}>
        <div>
          <Badge
            className={tw`mb-3 font-mono text-xs tracking-widest uppercase`}
            variant="secondary"
          >
            $ ls ./projects
          </Badge>
          <h2 className={tw`text-4xl font-bold tracking-tight`}>Projects</h2>
        </div>
      </div>
      <div className={tw`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
