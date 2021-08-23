/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

import "tailwindcss/tailwind.css";
import styles from "@styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hokki Suwanda</title>
        <meta name="description" content="Hello, I'm Hokki Suwanda!" />
      </Head>
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
      <div className="linebreak" />
      <div>AA</div>
    </>
  );
};

export default Home;
