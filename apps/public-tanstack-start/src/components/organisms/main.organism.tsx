import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import Section from '../atoms/section.atom';

import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import Occupations from './occupations.organism';

/**
 *
 */
export default function Main() {
  return (
    <Section className={tw`h-screen bg-transparent dark:bg-slate-950/80 md:flex-row md:gap-x-5`} id="cover">
      {/* TODO: migrate image — was: <Image alt="Me" className="rounded-full" fetchPriority="high" height={240} name="me" priority width={240} /> */}
      <div className={tw`flex h-60 flex-col justify-center gap-y-6 text-center text-2xl md:text-start`}>
        <div className={tw`flex flex-col gap-y-2`}>
          <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
          <Occupations delay={200} occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
          <h1>from Indonesia.</h1>
        </div>
        <div className={tw`flex flex-row justify-center gap-x-1 md:justify-normal`}>
          <a
            aria-label="Certified Node.js App Developer"
            className={cn(
              tw`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors`,
              tw`border-transparent bg-primary text-primary-foreground hover:bg-primary/80`,
            )}
            href="https://www.credly.com/badges/589bac2f-109c-4758-9aa8-495416bd0263/public_url"
            target="_blank"
          >
            Certified Node.js App Developer
          </a>
        </div>
        <div className={tw`flex flex-row justify-center gap-x-1 md:justify-normal`}>
          <a aria-label="gmail" className={tw`flex items-center`} href="https://link.hokkyss.com/mail-me" target="_blank">
            <EnvelopeIcon />
          </a>
          <a
            aria-label="Linkedin"
            className={tw`flex items-center`}
            href="https://link.hokkyss.com/linkedin"
            target="_blank"
          >
            <LinkedinLogoIcon />
          </a>
          <a aria-label="Github" className={tw`flex items-center`} href="https://link.hokkyss.com/github" target="_blank">
            <GithubLogoIcon />
          </a>
        </div>
      </div>
    </Section>
  );
}
