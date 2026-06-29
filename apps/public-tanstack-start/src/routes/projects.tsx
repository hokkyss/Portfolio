import tw from '@portfolio/design-system/tw';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, notFound } from '@tanstack/react-router';
import ProjectCard from '../components/molecules/project-card.molecule';
import getProjectsQuery from '../lib/projects/queries/get-projects.query';

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
  beforeLoad() {
    throw notFound();
  },
  loader: async (ctx) => {
    await ctx.context.queryClient.prefetchQuery(getProjectsQuery());
  },
});

/**
 * Full projects listing page.
 */
function RouteComponent() {
  const { data: projects } = useSuspenseQuery(getProjectsQuery());

  return (
    <main className={tw`mx-auto max-w-6xl px-6 pb-24 pt-32`} id="projects-page">
      <p className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}>
        $ ls -la ./projects
      </p>
      <h1 className={tw`mb-3 text-5xl font-bold tracking-tight`}>All Projects</h1>
      <p className={tw`mb-12 text-muted-foreground`}>
        {projects.length}
        {' '}
        project
        {projects.length !== 1 ? 's' : ''}
        {' '}
        and counting.
      </p>

      <div className={tw`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
