import 'server-only';

import Paragraph from '~/_server/_atoms/_paragraph/paragraph.atom';
import Section from '~/_server/_atoms/_section/section.atom';

import TechStacks from '../_tech-stacks/tech-stacks.organism';

export default async function AboutMeSection() {
  return (
    <Section
      className="justify-normal items-start min-h-full h-fit px-20 flex-col gap-y-10 bg-gradient-to-b from-transparent to-blue-400"
      id="about"
    >
      <h1 className="text-4xl font-bold self-center">Me and Myself</h1>
      <Paragraph>
        Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer from Indonesia. Full of enthusiasm and
        motivation with problem solving capabilities. Very excited to learn something new. Fulfilling all
        responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech
        stacks.
      </Paragraph>
      <Paragraph>
        I am a Bachelor of Engineering graduated from Bandung Institute of Technology Computer Science Major. The first
        programming language I learned is Pascal. It was in high school. That sparked my interest in programming. After
        a taste of competitive programming, I fell in love with coding. So, here I am.
      </Paragraph>
      <TechStacks />
    </Section>
  );
}
