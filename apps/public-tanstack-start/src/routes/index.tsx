import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import getExperiencesQuery from '../lib/experiences/queries/get-experiences.query';
import getProjectsQuery from '../lib/projects/queries/get-projects.query';
import getTechStacksQuery from '../lib/tech-stacks/queries/get-tech-stacks.query';

import AboutMe from '../components/organisms/about-me.organism';
import Experiences from '../components/organisms/experiences.organism';
import Main from '../components/organisms/main.organism';
import Projects from '../components/organisms/projects.organism';

export const Route = createFileRoute('/')(({
  component: RouteComponent,
  loader: async (ctx) => {
    await Promise.all([
      ctx.context.queryClient.prefetchQuery(getExperiencesQuery({})),
      ctx.context.queryClient.prefetchQuery(getProjectsQuery()),
      ctx.context.queryClient.prefetchQuery(getTechStacksQuery()),
    ]);
  },
}));

/**
 *
 */
function RouteComponent() {
  const { data: experiences } = useSuspenseQuery(getExperiencesQuery({}));
  const { data: projects } = useSuspenseQuery(getProjectsQuery());
  const { data: skills } = useSuspenseQuery(getTechStacksQuery());

  return (
    <>
      <Main />
      <AboutMe skills={skills} />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
    </>
  );
}
