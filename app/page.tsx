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
        'relative',
        'flex flex-col justify-center h-full items-center gap-y-5',
        'md:flex-row md:gap-x-5',
      )}
    >
      <Image alt="Me" className="w-60 h-60 rounded-full" fetchPriority="high" priority src={me} />
      <div className="text-2xl flex flex-col gap-y-2 text-center md:text-start">
        <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
        <Occupations occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
        <h1>from Indonesia.</h1>
      </div>
    </section>
  );
}
