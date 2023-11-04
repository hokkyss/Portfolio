'use server';

import 'server-only';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { tw } from '~/_common/utils/classname.util';
import Section from '~/_server/atoms/section.atom';

import TechStacks from './tech-stacks.organism';

const ExternalLink = dynamic(dynamicIconImports['external-link']);

export default async function AboutMe() {
  return (
    <Section
      className={tw`flex h-fit min-h-full flex-col items-start justify-normal gap-y-10 bg-gradient-to-b from-transparent to-blue-400 px-8 md:px-20`}
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
          className={tw`relative mr-2 inline-flex font-semibold hover:underline`}
          href="https://www.nintendo.com/us/store/products/fire-emblem-three-houses-switch/"
          target="_blank"
        >
          Fire Emblem Three Houses
          <ExternalLink className={tw`absolute -right-3 inline h-3 w-3`} />
        </Link>{' '}
        and{' '}
        <Link
          className={tw`relative inline-flex font-semibold hover:underline`}
          href="https://www.pokemon.com/us/pokemon-video-games/pokemon-black-version-and-pokemon-white-version/"
          target="_blank"
        >
          Pokémon Black
          <ExternalLink className={tw`absolute -right-3 inline h-3 w-3`} />
        </Link>
        .
      </p>
      <TechStacks />
    </Section>
  );
}
