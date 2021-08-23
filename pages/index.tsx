/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import "tailwindcss/tailwind.css";
import styles from "@styles/Home.module.css";

import { Navbar, Section } from "@components/layouts";
import { useRef } from "react";

const Home: NextPage = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const interestRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <title>Hokki Suwanda</title>
        <meta name="description" content="Hello, I'm Hokki Suwanda!" />
      </Head>
      <Navbar
        aboutRef={aboutRef}
        projectRef={projectRef}
        expRef={expRef}
        interestRef={interestRef}
      />
      <div className="content w-content h-content absolute">
        <div className="h-content w-content flex justify-center items-center flex-row">
          <img
            src="/images/photo2.jpg"
            alt="nah"
            className={`circle ${styles.myPhoto}`}
          />
          <div className={`flex flex-col ${styles.bio}`}>
            <div
              className={`${styles.name} text-heading font-heading tracking-default`}
            >
              Hokki Suwanda
            </div>
            <div className={`text-normal ${styles.description}`}>
              Informatics Engineering, Bandung Institute of Technology.
            </div>
            <div className={`text-big ${styles.description}`}>
              Software Engineer
            </div>
          </div>
        </div>
        <Section sectionRef={aboutRef} title="AboutMe">
          AAAAAAAAAAAAAAA
        </Section>
        <Section sectionRef={projectRef} title="MyProjects">
          A
        </Section>
        <Section sectionRef={expRef} title="MyExperiences">
          A
        </Section>
        <Section sectionRef={interestRef} title="Interests">
          A
        </Section>
      </div>
    </>
  );
};

export default Home;
