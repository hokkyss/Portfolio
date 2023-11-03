'use server';

import 'server-only';

import dynamic from 'next/dynamic';

import badgeVariants from '~/_common/styles/badge.style';
import { cn, tw } from '~/_common/utils/classname.util';
import { me } from '~/_server/assets/images';
import Icon from '~/_server/atoms/icon.atom';

const Image = dynamic(() => import('next/image'));
const Link = dynamic(() => import('next/link'));
const Section = dynamic(() => import('~/_server/atoms/section.atom'));
const Occupations = dynamic(() => import('~/_client/organisms/occupations.organism'));

const socialMediaLink = tw`flex items-center`;
const socialMediaIcon = tw`w-8 hover:fill-blue-500 transition-[fill] duration-300`;

const Main = async () => {
  return (
    <Section className={tw`md:flex-row md:gap-x-5`} id="cover">
      <Image alt="Me" className={tw`rounded-full`} fetchPriority="high" height={240} priority src={me} width={240} />
      <div className={tw`flex flex-col justify-center gap-y-6 text-2xl text-center md:text-start h-60`}>
        <div className={tw`flex flex-col gap-y-2`}>
          <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
          <Occupations delay={200} occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
          <h1>from Indonesia.</h1>
        </div>
        <div className={tw`flex flex-row gap-x-1`}>
          <Link
            className={cn(badgeVariants({ variant: 'default' }), tw`outline-none`)}
            href="https://www.credly.com/badges/589bac2f-109c-4758-9aa8-495416bd0263/public_url"
            target="_blank"
          >
            Certified Node.js App Developer
          </Link>
        </div>
        <div className={tw`flex flex-row justify-center md:justify-normal gap-x-1`}>
          <Link className={socialMediaLink} href="https://link.hokkyss.com/mail-me" target="_blank">
            <Icon className={socialMediaIcon} name="gmail" />
          </Link>
          <Link className={socialMediaLink} href="https://link.hokkyss.com/linkedin" target="_blank">
            <Icon className={socialMediaIcon} name="linkedin" />
          </Link>
          <Link className={socialMediaLink} href="https://link.hokkyss.com/github" target="_blank">
            <Icon className={socialMediaIcon} name="git" />
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Main;
