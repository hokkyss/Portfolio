import 'server-only';

import type DefaultPageProps from '~/_common/types/page-props.type';

import dynamic from 'next/dynamic';
import { cache } from 'react';
import { z } from 'zod';

import projectSchema from './_common/models/project.model';
import { thisWebsite, urlShortener } from './_server/assets/images';
import cmsService from './_server/services/cms/cms.service';

const Experiences = dynamic(() => import('./_server/organisms/experiences.organism'));
const Projects = dynamic(() => import('./_server/organisms/projects.organism'));
const Cursor = dynamic(() => import('./_client/atoms/cursor.atom'));
const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

// TODO: get data from CMS using `api.service.ts`
const getProjects = cache(async () =>
  z.array(projectSchema).parse([
    {
      description: `
Made with [Next.js](https://nextjs.org/) by leveraging its SEO and server side rendering capabilities to maximum.

I am not good at designing UIs, So, I use [shadcn-ui](https://ui.shadcn.com/) components and arrange them on-the-go.
`,
      id: '1',
      links: {
        github: 'https://github.com/hokkyss/Portfolio',
      },
      name: 'This website',
      relatedExperiences: [],
      summary: 'My Portfolio Website',
      techStacks: ['next.js', 'react', 'typescript'],
      thumbnail: thisWebsite,
    },
    {
      description: `
Currently available links: [github](https://link.hokkyss.com/github?utm_source=hokkyss-portfolio), [linkedin](https://link.hokkyss.com/linkedin?utm_source=hokkyss-portfolio), and [portfolio](https://link.hokkyss.com/portfolio?utm_source=hokkyss-portfolio).
    `,
      id: '2',
      links: {
        github: 'https://github.com/hokkyss/url-shortener',
        website: 'https://link.hokkyss.com?utm_source=hokkyss-portfolio',
      },
      name: 'URL Shortener',
      relatedExperiences: [],
      summary: 'Link Shortener',
      techStacks: ['firebase', 'node.js', 'express', 'typescript'],
      thumbnail: urlShortener,
    },
  ]),
);

export default async function Page(_props: HomePageProps) {
  const experiences = await cmsService.getExperiences();
  const projects = await getProjects();
  const skills = await cmsService.getSkills();

  return (
    <>
      <Cursor />
      <Main />
      <AboutMe skills={skills} />
      <Experiences experiences={experiences} />
      <Projects projects={projects} />
    </>
  );
}
