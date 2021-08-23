import type { AppProps } from "next/app";
import Head from "next/head";

import "@styles/globals.css";

import { Navbar } from "@components/layouts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Navbar />
      <div className="content w-content h-content absolute">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default MyApp;
