import React, { useRef } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@styles/globals.css";

import { Navbar } from "@components/layouts";

import ChevronUp from "@icons/chevron-up.svg";

function MyApp({ Component, pageProps }: AppProps) {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = (): void | null => {
    if (topRef.current) return topRef.current.scrollIntoView();
    return null;
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div ref={topRef}></div>

      <Component {...pageProps} />

      <button
        className="fixed cursor-pointer bottom-right-button circle flex justify-center items-center"
        onClick={scrollToTop}
      >
        <ChevronUp width="2.21vw" height="2.21vw" color="black" />
      </button>
    </>
  );
}
export default MyApp;
