import 'server-only';

import type DefaultPageProps from '~/_common/types/page-props.type';

import dynamic from 'next/dynamic';
import { cache } from 'react';
import { z } from 'zod';

import experienceSchema from './_common/models/experience.model';

const Experiences = dynamic(() => import('./_server/organisms/experiences.organism'));
const Cursor = dynamic(() => import('./_client/atoms/cursor.atom'));
const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

const getExperiences = cache(async () =>
  z.array(experienceSchema).parse([
    {
      company: {
        link: 'https://www.linkedin.com/company/75485763/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
        name: 'Nomura Research Institute Indonesia',
      },
      description: `
- Build high quality web applications that solves our client's problems.
- Write and ensure high quality codes through code reviews.
`,
      from: '2023-04-03',
      id: '1',
      role: 'Front End Engineer',
      techStacks: ['react', 'styled-components', 'redux', 'tailwindcss', 'react-query', 'typescript'],
    },
    {
      company: {
        link: 'https://www.linkedin.com/company/13357145/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
        name: 'GDP Labs',
      },
      description: `
Collaborated with 1 partner and 2 mentors on exploring three projects:
- Low Code Stack for Web Development using Webflow, Airtable, and Firebase
- Integrate web workers with Angular's dependency injection features
- Integrate and validate forms with Airtable
`,
      from: '2022-06-02',
      id: '2',
      role: 'Software Development Engineer Intern',
      techStacks: ['angular', 'nestjs', 'firebase', 'typescript'],
      to: '2022-08-31',
    },
    {
      company: {
        link: 'https://socl.es',
        name: 'Socl.es',
      },
      description: `
- Built Socles, an Activity Social Network Application available on both web and mobile.
- Migrated the codebase for web application from JavaScript to TypeScript.`,
      from: '2021-06-15',
      id: '3',
      role: 'Front End Intern - Fullstack Engineer',
      techStacks: ['react', 'next.js', 'react-native', 'tailwindcss', 'firebase', 'postgresql', 'django', 'typescript'],
      to: '2022-09-01',
    },
    {
      company: {
        link: 'https://www.linkedin.com/company/13306889/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
        name: 'Kabinet KM ITB',
      },
      description: `
- Managed a 5-men Tech and QA division together with Project Manager
- Set coding conventions for the team to work with
- Ensured high quality codes for the workspace through code reviews
`,
      from: '2021-09-01',
      id: '4',
      role: 'Lead',
      techStacks: ['typescript'],
      to: '2022-04-01',
    },
    {
      company: {
        link: 'https://www.linkedin.com/company/13306889/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D',
        name: 'Kabinet KM ITB',
      },
      description: `
Built Anmategra, performance tracking web application for students of Bandung Institute of Technology
`,
      from: '2021-09-01',
      id: '5',
      role: 'Fullstack Engineer',
      techStacks: ['react', 'node.js', 'prisma', 'express', 'mysql'],
      to: '2022-04-01',
    },
  ]),
);

export default async function Page(_props: HomePageProps) {
  const experiences = await getExperiences();

  return (
    <>
      <Cursor />
      <Main />
      <AboutMe />
      <Experiences experiences={experiences} />
    </>
  );
}
