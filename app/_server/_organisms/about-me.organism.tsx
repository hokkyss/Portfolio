import 'server-only';

import { memo } from 'react';

import Section from '~/_server/_atoms/section.atom';

import TechStacks from './tech-stacks.organism';

const containerStyle =
  'flex flex-col justify-normal items-start gap-y-10 min-h-full h-fit px-20 bg-gradient-to-b from-transparent to-blue-400';
const titleStyle = 'text-4xl font-bold self-center';
const contentStyle = 'text-lg';

const AboutMe = memo(async () => {
  return (
    <Section className={containerStyle} id="about">
      <h1 className={titleStyle}>Me and Myself</h1>
      <p className={contentStyle}>
        Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer from Indonesia. Full of enthusiasm and
        motivation with problem solving capabilities. Very excited to learn something new. Fulfilling all
        responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech
        stacks.
      </p>
      <p className={contentStyle}>
        I am a Bachelor of Engineering graduated from Bandung Institute of Technology Computer Science Major. The first
        programming language I learned is Pascal. It was in high school. That sparked my interest in programming. After
        a taste of competitive programming, I fell in love with coding. So, here I am.
      </p>
      <TechStacks />
    </Section>
  );
});

export default AboutMe;
