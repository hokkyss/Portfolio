import './globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Inter } from 'next/font/google';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import NavigationItem from '~/_client/_atoms/_navigation-item/navigation-item.atom';

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

const RootLayout = memo<PropsWithChildren>(async ({ children }) => {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, 'flex flex-col' /* , 'text-black dark:text-white' */)}>
        <nav
          className={twMerge(
            'fixed left-0 top-0 right-0',
            'flex justify-between',
            'backdrop-blur-md',
            'bg-gradient-to-b dark:from-black from-zinc-200',
            'p-6',
            'z-50',
          )}
        >
          <div className="flex items-center gap-x-2">
            <NavigationItem href="/">Home</NavigationItem>
            <NavigationItem href="/about">About</NavigationItem>
            <NavigationItem href="/about">Projects</NavigationItem>
            <NavigationItem href="/about">Blogs</NavigationItem>
          </div>
          <div className="flex justify-end items-center" />
        </nav>
        <main className="min-h-screen h-screen">{children}</main>
        <footer
          className={twMerge(
            'h-20 w-full z-50',
            'flex items-end justify-center',
            'fixed bottom-0 left-0 right-0',
            'bg-gradient-to-t from-white via-white dark:from-black dark:via-black',
            'pb-3',
            'text-xs',
          )}
        >
          Copyright &copy; 2023 Hokki Suwanda. All rights reserved.
        </footer>
      </body>
    </html>
  );
});

export default RootLayout;
