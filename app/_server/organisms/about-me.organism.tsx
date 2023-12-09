'use server';

import 'server-only';

import type { Tech } from '~/_common/models/tech.model';

import Link from 'next/link';

import { tw } from '~/_common/utils/classname.util';
import Section from '~/_server/atoms/section.atom';

import LucideIcon from '../atoms/lucide-icon.atom';

import TechStacks from './tech-stacks.organism';

interface AboutMeProps {
  skills: Tech[];
}

export default async function AboutMe({ skills }: AboutMeProps) {
  return (
    <Section
      className={tw`relative flex h-fit min-h-full flex-col items-start justify-normal gap-y-10 bg-gradient-to-b from-transparent to-blue-600/50 px-8 dark:from-slate-950/80 dark:to-blue-950/80 md:px-20`}
      id="about"
    >
      <h1 className={tw`self-center text-4xl font-bold`}>Me and Myself</h1>
      <p className={tw`text-lg`}>
        Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer from Indonesia. Full of enthusiasm and
        motivation with problem solving capabilities. Very excited to learn something new. Fulfilling all
        responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech
        stacks.
      </p>
      <p className={tw`text-lg`}>
        I am a Bachelor of Engineering graduated from Bandung Institute of Technology Computer Science Major. The first
        programming language I learned is Pascal. It was in high school. That sparked my interest in programming. After
        a taste of competitive programming, I fell in love with coding. So, here I am.
      </p>
      <p className={tw`w-full text-lg`}>
        By the way, my favorite games are{' '}
        <Link
          aria-label="Fire Emblem Three Houses"
          className={tw`relative mr-2 inline-flex font-semibold hover:underline`}
          href="https://www.nintendo.com/us/store/products/fire-emblem-three-houses-switch/"
          target="_blank"
        >
          Fire Emblem Three Houses
          <LucideIcon className={tw`absolute -right-3 inline h-3 w-3`} name="external-link" />
        </Link>{' '}
        and{' '}
        <Link
          aria-label="Pokémon Black and White"
          className={tw`relative mr-2 inline-flex font-semibold hover:underline`}
          href="https://www.pokemon.com/us/pokemon-video-games/pokemon-black-version-and-pokemon-white-version/"
          target="_blank"
        >
          Pokémon Black and White
          <LucideIcon className={tw`absolute -right-3 inline h-3 w-3`} name="external-link" />
        </Link>
        . In fact, this website&apos;s colors are inspired from the games:{' '}
        <code className={tw`hidden bg-white px-1 text-black dark:inline`}>Black</code>{' '}
        <code className={tw`inline bg-black px-1 text-white dark:hidden`}>White</code>,{' '}
        <code className={tw`text-blue-600`}>Blue</code>, <code className={tw`text-amber-500`}>Orange</code>, and{' '}
        <code className={tw`text-red-500`}>Red</code>.
      </p>
      <TechStacks tech={skills} />
    </Section>
  );
}
