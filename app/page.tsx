import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

export default async function HomePage(_props: HomePageProps) {
  return <section className="flex flex-col items-center justify-between">Home</section>;
}
