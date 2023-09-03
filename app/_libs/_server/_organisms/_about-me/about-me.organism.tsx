import 'server-only';

import { memo } from 'react';

import Section from '~/_server/_atoms/_section/section.atom';

import TechStacks from '../_tech-stacks/tech-stacks.organism';

import styles from './about-me.module.css';

const AboutMe = memo(async () => {
  return (
    <Section className={styles.container} id="about">
      <h1 className={styles.title}>Me and Myself</h1>
      <p className={styles.content}>
        Hi! I&apos;m Hokki Suwanda. I&apos;m a Fullstack Software Engineer from Indonesia. Full of enthusiasm and
        motivation with problem solving capabilities. Very excited to learn something new. Fulfilling all
        responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech
        stacks.
      </p>
      <p className={styles.content}>
        I am a Bachelor of Engineering graduated from Bandung Institute of Technology Computer Science Major. The first
        programming language I learned is Pascal. It was in high school. That sparked my interest in programming. After
        a taste of competitive programming, I fell in love with coding. So, here I am.
      </p>
      <TechStacks />
    </Section>
  );
});

export default AboutMe;
