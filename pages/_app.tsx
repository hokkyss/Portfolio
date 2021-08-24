import React, { useRef } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "@styles/globals.css";

import ChevronUp from "@icons/chevron-up.svg";
import { SIZES } from "@constants";

function MyApp({ Component, pageProps }: AppProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const size = SIZES.big;

  const scrollToTop = (): void | null => {
    if (topRef.current) return topRef.current.scrollIntoView();
    return null;
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
        <meta name="description" content="Hello, I'm Hokki Suwanda!" />
      </Head>
      <div ref={topRef}></div>

      <Component {...pageProps} />

      <button
        className="fixed cursor-pointer bottom-right-button circle flex justify-center items-center"
        onClick={scrollToTop}
      >
        <ChevronUp width={size} height={size} color="black" />
      </button>
    </>
  );
}
export default MyApp;
