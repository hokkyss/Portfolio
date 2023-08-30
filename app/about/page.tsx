import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from '~/_common/_types/page-props.type';

import { memo } from 'react';

type AboutPageProps = DefaultPageProps;

export async function generateMetadata(_props: AboutPageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: 'hokkyss | About',
  };
}

const AboutPage = memo(async () => {
  return <div>About</div>;
});

export default AboutPage;
