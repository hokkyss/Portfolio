import type { AppProps } from "next/app";
import Head from "next/head";

import "@styles/globals.css";

import { Navbar } from "@components/layouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="user-scalable=0"></meta>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
