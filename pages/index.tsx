import React, { useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import styles from "@styles/Home.module.css";

import { ContentContainer, Navbar, Section } from "@components/layouts";
import {
  BigBreak,
  BigText,
  CircleImage,
  HeadingText,
  NormalBreak,
  NormalText,
  SmallText,
} from "@components/elements";
import { ProjectList, TechStacks } from "@components/modules";

const Home: NextPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const interestRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>Hokki Suwanda</title>
      </Head>
      <Navbar
        aboutRef={aboutRef}
        projectRef={projectRef}
        expRef={expRef}
        interestRef={interestRef}
      />
      <ContentContainer>
        <div className="h-content w-content flex justify-center items-center flex-row">
          <CircleImage
            src="/images/photo2.jpg"
            alt="nah"
            className={styles.myPhoto}
          />
          <div className={`flex flex-col ${styles.bio}`}>
            <HeadingText>Hokki Suwanda</HeadingText>
            <div className={styles.description}>
              <NormalText>
                Informatics Engineering, Bandung Institute of Technology.
              </NormalText>
            </div>
            <div className={styles.description}>
              <BigText>Software Engineer</BigText>
            </div>
          </div>
        </div>
        <Section sectionRef={aboutRef} title="AboutMe">
          <NormalText>
            Hi! I&apos;m Hokki Suwanda. I&apos;m currently an undergraduate
            student in Bandung Institute of Technology. I&apos;m very passionate
            in modern technology, especially in Software Engineering fields.
          </NormalText>
          <NormalBreak />
          <NormalText>
            I&apos;m currently exploring Web Development. However, I&apos;m
            willing to learn other things too! And importantly, I&apos;m open to
            work!
          </NormalText>
          <BigBreak />
          <TechStacks />
          <NormalBreak />
        </Section>
        <Section sectionRef={projectRef} title="MyProjects">
          <ProjectList />
        </Section>
        <Section sectionRef={expRef} title="MyExperiences">
          <SmallText>A</SmallText>
        </Section>
        <Section sectionRef={interestRef} title="Interests">
          <SmallText>A</SmallText>
        </Section>
      </ContentContainer>
    </>
  );
};

export default Home;
