import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import Occupations from '~/_client/_organisms/_occupations/occupations.organism';
import me from '~/_server/_assets/me.png';
import Icon from '~/_server/_atoms/_icons/icon.atom';
import Section from '~/_server/_atoms/_section/section.atom';
import AboutMeSection from '~/_server/_organisms/_about-me-section/about-me-section.organism';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

const iconClassName = 'w-8 hover:fill-blue-500 transition-[fill] duration-300';

const HomePage = memo<HomePageProps>(async (_props) => {
  const LinkedInIcon = Icon.linkedin;
  const GitIcon = Icon.git;

  return (
    <>
      <Section className="md:flex-row md:gap-x-5" id="cover">
        <Image alt="Me" className="rounded-full" fetchPriority="high" height={240} priority src={me} width={240} />
        <div className="text-2xl h-60 flex flex-col justify-center gap-y-8 text-center md:text-start">
          <div className="flex flex-col gap-y-2">
            <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
            <Occupations delay={200} occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
            <h1>from Indonesia.</h1>
          </div>
          <div className="flex flex-row gap-x-1 justify-center md:justify-normal">
            <Link className="flex items-center" href="https://link.hokkyss.com/mail-me" target="_blank">
              <GmailIcon className={iconClassName} />
            </Link>
            <Link className="flex items-center" href="https://link.hokkyss.com/linkedin" target="_blank">
              <LinkedInIcon className={iconClassName} />
            </Link>
            <Link className="flex items-center" href="https://link.hokkyss.com/github" target="_blank">
              <GitIcon className={iconClassName} />
            </Link>
          </div>
        </div>
      </Section>
      <AboutMeSection />
    </>
  );
});

export default HomePage;
