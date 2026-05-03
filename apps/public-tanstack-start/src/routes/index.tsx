import { Await, createFileRoute, useLoaderData } from '@tanstack/react-router';
import { Suspense } from 'react';
import AboutSection from '../components/organisms/about.section';
import ContactSection from '../components/organisms/contact.section';
import ExperienceSection from '../components/organisms/experience.section';
import HeroSection from '../components/organisms/hero.section';
import ProjectsSection from '../components/organisms/projects.section';
import TechStackSection from '../components/organisms/tech-stack.section';
import getExperiencesQuery from '../lib/experiences/queries/get-experiences.query';
import getProjectsQuery from '../lib/projects/queries/get-projects.query';
import getTechStacksQuery from '../lib/tech-stacks/queries/get-tech-stacks.query';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: (ctx) => {
    return {
      experiences: ctx.context.queryClient.prefetchQuery(getExperiencesQuery({})),
      projects: ctx.context.queryClient.prefetchQuery(getProjectsQuery()),
      techGroups: ctx.context.queryClient.prefetchQuery(getTechStacksQuery()),
    };
  },
});

/**
 *
 */
function RouteComponent() {
  const { experiences: experiencesPromise, projects: projectsPromise, techGroups: techGroupsPromise } = useLoaderData({
    from: '/',
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Suspense>
        <Await promise={experiencesPromise}>{() => <ExperienceSection />}</Await>
      </Suspense>
      <Suspense>
        <Await promise={projectsPromise}>
          {() => <ProjectsSection />}
        </Await>
      </Suspense>
      <Suspense>
        <Await promise={techGroupsPromise}>{() => <TechStackSection />}</Await>
      </Suspense>
      <ContactSection />
    </>
  );
}
