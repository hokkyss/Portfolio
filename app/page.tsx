import 'server-only';

import type DefaultPageProps from '~/_common/types/page-props.type';

import dynamic from 'next/dynamic';
import { cache } from 'react';

import apiEndpoint from './_common/services/api/api.service';

const Experiences = dynamic(() => import('./_server/organisms/experiences.organism'));
const Cursor = dynamic(() => import('./_client/atoms/cursor.atom'));
const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

const getExperiences = cache(apiEndpoint.getExperiences);

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
