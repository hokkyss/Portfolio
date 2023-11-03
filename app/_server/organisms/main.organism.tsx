'use server';

import 'server-only';

import dynamic from 'next/dynamic';

import { me } from '~/_server/assets/images';
import Icon from '~/_server/atoms/icon.atom';

const Image = dynamic(() => import('next/image'));
const Link = dynamic(() => import('next/link'));
const Section = dynamic(() => import('~/_server/atoms/section.atom'));
const Occupations = dynamic(() => import('~/_client/organisms/occupations.organism'));

const sectionStyle = 'md:flex-row md:gap-x-5';
const myPictureStyle = 'rounded-full';
const descriptionContainerStyle = 'flex flex-col justify-center gap-y-8 text-2xl text-center md:text-start h-60';
const textContainerStyle = 'flex flex-col gap-y-2';
const socialMediaContainerStyle = 'flex flex-row justify-center md:justify-normal gap-x-1';
const socialMediaLinkStyle = 'flex items-center';
const socialMediaIconStyle = 'w-8 hover:fill-blue-500 transition-[fill] duration-300';

const Main = async () => {
  const LinkedInIcon = Icon.linkedin;
  const GitIcon = Icon.git;
  const GmailIcon = Icon.gmail;

  return (
    <Section className={sectionStyle} id="cover">
      <Image alt="Me" className={myPictureStyle} fetchPriority="high" height={240} priority src={me} width={240} />
      <div className={descriptionContainerStyle}>
        <div className={textContainerStyle}>
          <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
          <Occupations delay={200} occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
          <h1>from Indonesia.</h1>
        </div>
        <div className={socialMediaContainerStyle}>
          <Link className={socialMediaLinkStyle} href="https://link.hokkyss.com/mail-me" target="_blank">
            <GmailIcon className={socialMediaIconStyle} />
          </Link>
          <Link className={socialMediaLinkStyle} href="https://link.hokkyss.com/linkedin" target="_blank">
            <LinkedInIcon className={socialMediaIconStyle} />
          </Link>
          <Link className={socialMediaLinkStyle} href="https://link.hokkyss.com/github" target="_blank">
            <GitIcon className={socialMediaIconStyle} />
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Main;
