import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from '~/_common/types/page-props.type';

type AboutPageProps = DefaultPageProps;

export async function generateMetadata(_props: AboutPageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: 'About',
  };
}

export default async function Page() {
  return <div>About</div>;
}
