'use server';

import 'server-only';

import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from '~/_common/types/page-props.type';

import dynamic from 'next/dynamic';

const Main = dynamic(() => import('./_server/organisms/main.organism'));
const AboutMe = dynamic(() => import('./_server/organisms/about-me.organism'));

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

export default async function Page(_props: HomePageProps) {
  return (
    <>
      <Main />
      <AboutMe />
    </>
  );
}
