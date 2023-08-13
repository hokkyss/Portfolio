import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import Occupations from './_libs/_client/_organisms/_occupations/occupations.organism';
import me from './_libs/_server/_assets/me.png';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

export default async function HomePage(_props: HomePageProps) {
  return (
    <section
      className={twMerge(
        'flex flex-col h-full items-center justify-between gap-y-5',
        'md:flex-row md:justify-center md:gap-x-5',
      )}
    >
      <Image alt="Me" className="w-60 h-60 rounded-full" fetchPriority="high" priority src={me} />
      <div className="text-2xl flex flex-col gap-y-2">
        <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
        <Occupations occupations={['fullstack engineer', 'self learner', 'tech enthusiast']} />
        <h1>from Indonesia.</h1>
      </div>
    </section>
  );
}
