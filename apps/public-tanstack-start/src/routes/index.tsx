import { Await, createFileRoute, useLoaderData } from '@tanstack/react-router';
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
  shouldReload: false,
  headers() {
    return {
      'Cache-Control': 'public, max-age=86400',
      'CDN-Cache-Control': 'max-age=604800',
      'Netlify-CDN-Cache-Control': 'public, maxage=604800, s-maxage=604800, stale-while-revalidate',
      'Netlify-Vary': 'cookie=th',
    };
  },
});

/**
 *
 */
function RouteComponent() {
  const experiencesPromise = useLoaderData({
    from: '/',
    select: (d) => d.experiences,
  });
  const projectsPromise = useLoaderData({
    from: '/',
    select: (d) => d.projects,
  });
  const techGroupsPromise = useLoaderData({
    from: '/',
    select: (d) => d.techGroups,
  });

  return (
    <>
      <HeroSection />
      <AboutSection />
      <Await promise={experiencesPromise}>{() => <ExperienceSection />}</Await>
      <Await promise={projectsPromise}>
        {() => <ProjectsSection />}
      </Await>
      <Await promise={techGroupsPromise}>{() => <TechStackSection />}</Await>
      <ContactSection />
    </>
  );
}
