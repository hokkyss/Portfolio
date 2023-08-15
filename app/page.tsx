import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';
import Image from 'next/image';
import Link from 'next/link';

import GitIcon from './_libs/_client/_assets/git.svg';
import LinkedInIcon from './_libs/_client/_assets/linkedin.svg';
import Paragraph from './_libs/_client/_atoms/_paragraph/paragraph.atom';
import Section from './_libs/_client/_atoms/_section/section.atom';
import Occupations from './_libs/_client/_organisms/_occupations/occupations.organism';
import me from './_libs/_server/_assets/me.png';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

const iconClassName = 'w-8 hover:fill-blue-500 transition-[fill] duration-300';

export default async function HomePage(_props: HomePageProps) {
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
      </Section>
      <Section
        className="justify-normal items-start min-h-full h-fit px-20 flex-col gap-y-7 bg-gradient-to-b from-transparent to-blue-400"
        id="about"
      >
        <h1 className="text-4xl font-bold">Me and Myself</h1>
        <Paragraph>
          Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer from Indonesia. Full of enthusiasm and
          motivation with problem solving capabilities. Very excited to learn something new. Fulfilling all
          responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech
          stacks.
        </Paragraph>
        <Paragraph>
          I am a Bachelor of Engineering graduated from Bandung Institute of Technology Computer Science Major. The
          first programming language I learned is Pascal. It was in high school. That sparked my interest in
          programming. After a taste of competitive programming, I fell in love with coding. So, here I am.
        </Paragraph>
      </Section>
    </>
  );
}
