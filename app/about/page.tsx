import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from '~/_common/_types/page-props.type';

type AboutPageProps = DefaultPageProps;

export async function generateMetadata(_props: AboutPageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: 'hokkyss | About',
  };
}

export default async function AboutPage() {
  return <div>About</div>;
}
