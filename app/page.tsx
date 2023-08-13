import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import GitIcon from './_libs/_client/_assets/git.svg';
import LinkedInIcon from './_libs/_client/_assets/linkedin.svg';
import Occupations from './_libs/_client/_organisms/_occupations/occupations.organism';
import me from './_libs/_server/_assets/me.png';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

const iconClassName = 'w-8 hover:fill-blue-500 transition-[fill] duration-300';

export default async function HomePage(_props: HomePageProps) {
  return (
    <section
      className={twMerge(
        'relative',
        'flex flex-col justify-center h-full items-center gap-y-5',
        'md:flex-row md:gap-x-5',
      )}
    >
      <Image alt="Me" className="rounded-full" fetchPriority="high" height={240} priority src={me} width={240} />
      <div className="text-2xl h-60 flex flex-col justify-center gap-y-8 text-center md:text-start">
        <div className="flex flex-col gap-y-2">
          <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
          <Occupations occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
          <h1>from Indonesia.</h1>
        </div>
        <div className="flex flex-row gap-x-1 justify-center md:justify-normal">
          <Link href="https://link.hokkyss.com/mail-me" target="_blank">
            <GmailIcon className={iconClassName} />
          </Link>
          <Link href="https://link.hokkyss.com/linkedin" target="_blank">
            <LinkedInIcon className={iconClassName} />
          </Link>
          <Link href="https://link.hokkyss.com/github" target="_blank">
            <GitIcon className={iconClassName} />
          </Link>
        </div>
      </div>
    </section>
  );
}
