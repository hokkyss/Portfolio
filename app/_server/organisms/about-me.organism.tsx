'use server';

import 'server-only';

import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { tw } from '~/_common/utils/classname.util';
import Section from '~/_server/atoms/section.atom';

import TechStacks from './tech-stacks.organism';

const ExternalLink = dynamic(dynamicIconImports['external-link']);

const AboutMe = async () => {
  return (
    <Section
      className={tw`flex flex-col justify-normal items-start gap-y-10 min-h-full h-fit bg-gradient-to-b from-transparent to-blue-400 px-8 md:px-20`}
      id="about"
    >
      <h1 className={tw`text-4xl font-bold self-center`}>Me and Myself</h1>
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
      <p className={tw`text-lg w-full`}>
        By the way, my favorite games are{' '}
        <Link
          className={tw`font-semibold hover:underline inline-flex relative mr-2`}
          href="https://www.nintendo.com/us/store/products/fire-emblem-three-houses-switch/"
          target="_blank"
        >
          Fire Emblem Three Houses
          <ExternalLink className={tw`inline absolute w-3 h-3 -right-3`} />
        </Link>{' '}
        and{' '}
        <Link
          className={tw`font-semibold hover:underline inline-flex relative`}
          href="https://www.pokemon.com/us/pokemon-video-games/pokemon-black-version-and-pokemon-white-version/"
        >
          Pokémon Black
          <ExternalLink className={tw`inline absolute w-3 h-3 -right-3`} />
        </Link>
        .
      </p>
      <TechStacks />
    </Section>
  );
};

export default AboutMe;
