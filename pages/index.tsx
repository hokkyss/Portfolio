import type { NextPage } from "next";
import Head from "next/head";

import "tailwindcss/tailwind.css";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hokki Suwanda</title>
        <meta name="description" content="Hello, I'm Hokki Suwanda!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
