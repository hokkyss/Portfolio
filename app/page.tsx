import type { Metadata, ResolvingMetadata } from 'next';

import type DefaultPageProps from './_libs/_common/_types/page-props.type';

import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import Occupations from '~/_client/_organisms/_occupations/occupations.organism';
import me from '~/_server/_assets/me.png';
import Icon from '~/_server/_atoms/_icons/icon.atom';
import Section from '~/_server/_atoms/_section/section.atom';
import AboutMeSection from '~/_server/_organisms/_about-me/about-me.organism';

import styles from './page.module.css';

type HomePageProps = DefaultPageProps;

export async function generateMetadata(_props: HomePageProps, _parent: ResolvingMetadata): Promise<Metadata> {
  return {};
}

const HomePage = memo<HomePageProps>(async (_props) => {
  const LinkedInIcon = Icon.linkedin;
  const GitIcon = Icon.git;

  return (
    <>
      <Section className={styles.section} id="cover">
        <Image alt="Me" className={styles.me} fetchPriority="high" height={240} priority src={me} width={240} />
        <div className={styles['description-container']}>
          <div className={styles['text-container']}>
            <h1>Hi, I&apos;m Hokki Suwanda, a</h1>
            <Occupations delay={200} occupations={['fullstack engineer', 'motivated learner', 'tech enthusiast']} />
            <h1>from Indonesia.</h1>
          </div>
          <div className={styles['social-media-container']}>
            <Link className={styles['social-media-link']} href="https://link.hokkyss.com/mail-me" target="_blank">
              <GmailIcon className={styles['social-media-icon']} />
            </Link>
            <Link className={styles['social-media-link']} href="https://link.hokkyss.com/linkedin" target="_blank">
              <LinkedInIcon className={styles['social-media-icon']} />
            </Link>
            <Link className={styles['social-media-link']} href="https://link.hokkyss.com/github" target="_blank">
              <GitIcon className={styles['social-media-icon']} />
            </Link>
          </div>
        </div>
      </Section>
      <AboutMeSection />
    </>
  );
});

export default HomePage;
