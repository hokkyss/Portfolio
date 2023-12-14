import 'server-only';
import './globals.css';

import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import WebVitals from './_client/atoms/web-vitals.atom';
import envConfig from './_common/configs/env.config';
import { cn, tw } from './_common/utils/classname.util';

// #region FONTS
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// #endregion

// #region PROP TYPE
interface LayoutProps {
  children: ReactNode;
  params: Record<string, never>;
}
// #endregion

// #region METADATA
export const viewport: Viewport = {
  colorScheme: 'light dark',
  height: 'device-height',
  initialScale: 1.0,
  minimumScale: 1.0,
  themeColor: '#fff',
  width: 'device-width',
};

export const metadata: Metadata = {
  applicationName: 'Hokki Suwanda Portfolio',
  authors: [{ name: 'Hokki Suwanda', url: 'https://github.com/hokkyss' }],
  creator: 'Hokki Suwanda',
  description:
    "I'm Hokki Suwanda, a fullstack software engineer. A Computer Science Fresh Graduate. Full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities wholeheartedly. Pursuing career as a fullstack software engineer. Used quite lot of tech stacks.",
  generator: 'Next.js',
  keywords: [
    'Hokki Suwanda',
    'hokkyss',
    'software engineer',
    'fullstack engineer',
    'front end engineer',
    'back end engineer',
    'web developer',
    'ITB',
    'Bandung Institute of Technology',
    'Institut Teknologi Bandung',
    'competitive programming',
  ],
  other: {
    'google-site-verification': 'SopKMe65nppr9IAQ7VUBO9NGz7Rek--0P1sqHEyvIOU',
  },
  publisher: 'Vercel',
  robots: {
    googleBot: {
      index: !envConfig.__DEV__,
      notranslate: true,
    },
    index: !envConfig.__DEV__,
    notranslate: true,
  },
  title: {
    default: 'hokkyss | Hokki Suwanda',
    template: 'hokkyss | %s',
  },
};
// #endregion

export default async function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <html dir="ltr" lang="en">
      <head>
        <SpeedInsights debug={envConfig.__DEV__} />
      </head>
      {envConfig.gtmId && <GoogleTagManager gtmId={envConfig.gtmId} />}
      <body className={cn('notranslate', inter.className, tw`relative flex flex-col text-black dark:text-white/80`)}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        {envConfig.gtmId && (
          <noscript>
            <iframe
              className={tw`invisible hidden`}
              height="0"
              sandbox=""
              src={`https://www.googletagmanager.com/ns.html?id=${envConfig.gtmId}`}
              width="0"
            />
          </noscript>
        )}
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <main className={tw`min-h-screen`} role="main">
          {children}
        </main>
        <footer
          className={tw`fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full flex-row items-end justify-center bg-gradient-to-t from-white via-white pb-3 text-xs dark:from-black dark:via-black`}
        >
          Copyright &copy; 2023 Hokki Suwanda. Made with{' '}
          <Link
            aria-label="shadcn-ui"
            className={tw`ml-1 text-blue-600 hover:underline`}
            href="https://ui.shadcn.com/"
            target="_blank"
          >
            shadcn-ui
          </Link>
          .
        </footer>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
