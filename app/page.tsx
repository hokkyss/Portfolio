import 'server-only';

import type DefaultPageProps from '~/_common/types/page-props.type';

import { unstable_cache } from 'next/cache';
import dynamic from 'next/dynamic';

import apiEndpoint from './_common/services/api/api.service';

const Experiences = dynamic(() => import('./_server/organisms/experiences.organism'));
const Cursor = dynamic(() => import('./_client/atoms/cursor.atom'));
const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

const getExperiences = unstable_cache(() => apiEndpoint.getExperiences(), ['api.experiences'], {
  tags: ['api.experiences'],
});

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
