import 'server-only';
import './globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import Cursor from './_client/atoms/cursor.atom';
import WebVitals from './_client/atoms/web-vitals.atom';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  authors: [{ name: 'Hokki Suwanda', url: 'https://github.com/hokkyss' }],
  colorScheme: 'light dark',
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
  title: 'hokkyss | Hokki Suwanda',
};

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html dir="ltr" lang="en">
      <body className={twMerge(inter.className, 'flex flex-col text-black dark:text-white')}>
        <main className="min-h-screen h-screen" role="main">
          {children}
        </main>
        <footer className="fixed bottom-0 left-0 right-0 z-50 h-20 w-full flex flex-row items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black pb-3 text-xs">
          Copyright &copy; 2023 Hokki Suwanda. All rights reserved.
        </footer>
        <Analytics />
        <Cursor />
        <WebVitals />
      </body>
    </html>
  );
}
