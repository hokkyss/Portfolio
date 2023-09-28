import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from '~/_common/_types/page-props.type';

import dynamic from 'next/dynamic';
import { memo } from 'react';

const Main = dynamic(() => import('./_server/_organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/_organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

const HomePage = memo<HomePageProps>(async (_props) => {
  return (
    <>
      <Main />
      <AboutMe />
    </>
  );
});

export default HomePage;
