import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import getExperiencesQuery from '../lib/experiences/queries/get-experiences.query';
import getProjectsQuery from '../lib/projects/queries/get-projects.query';
import getTechStacksQuery from '../lib/tech-stacks/queries/get-tech-stacks.query';

import HeroSection from '../components/organisms/hero.section';
import AboutSection from '../components/organisms/about.section';
import ExperienceSection from '../components/organisms/experience.section';
import ProjectsSection from '../components/organisms/projects.section';
import TechStackSection from '../components/organisms/tech-stack.section';
import ContactSection from '../components/organisms/contact.section';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async (ctx) => {
    await Promise.all([
      ctx.context.queryClient.prefetchQuery(getExperiencesQuery({})),
      ctx.context.queryClient.prefetchQuery(getProjectsQuery()),
      ctx.context.queryClient.prefetchQuery(getTechStacksQuery()),
    ]);
  },
});

/**
 *
 */
function RouteComponent() {
  const { data: experiences } = useSuspenseQuery(getExperiencesQuery({}));
  const { data: projects } = useSuspenseQuery(getProjectsQuery());
  const { data: techGroups } = useSuspenseQuery(getTechStacksQuery());

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <TechStackSection techGroups={techGroups} />
      <ContactSection />
    </>
  );
}
