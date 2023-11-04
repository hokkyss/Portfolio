import 'server-only';
import './globals.css';

import type { Metadata, ResolvingMetadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import type { EmptyObject } from './_common/types/common.type';

import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';

import WebVitals from './_client/atoms/web-vitals.atom';
import envConfig from './_common/configs/env.config';
import { cn, tw } from './_common/utils/classname.util';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateViewport(): Viewport {
  if (envConfig.__DEV__) {
    return {};
  }
  return {
    colorScheme: 'light dark',
    height: 'device-height',
    initialScale: 1.0,
    maximumScale: 1.0,
    minimumScale: 1.0,
    width: 'device-width',
  };
}

export async function generateMetadata(_props: EmptyObject, _parent: ResolvingMetadata): Promise<Metadata> {
  if (envConfig.__DEV__) {
    return {};
  }

  return {
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
    publisher: 'Vercel',
    robots: {
      notranslate: true,
    },
    title: {
      default: 'hokkyss | Hokki Suwanda',
      template: 'hokkyss | %s',
    },
  };
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html dir="ltr" lang="en">
      <body className={cn('notranslate', inter.className, tw`relative flex flex-col text-black dark:text-white/80`)}>
        <main className={tw`min-h-screen`} role="main">
          {children}
        </main>
        <footer
          className={tw`fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full flex-row items-end justify-center bg-gradient-to-t from-white via-white pb-3 text-xs dark:from-black dark:via-black`}
        >
          Copyright &copy; 2023 Hokki Suwanda. All rights reserved.
        </footer>
        <Analytics />
        <WebVitals />
      </body>
    </html>
  );
}
