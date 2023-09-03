import './globals.css';

import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { Inter } from 'next/font/google';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import NavigationItem from '~/_client/_atoms/_navigation-item/navigation-item.atom';

import styles from './layout.module.css';

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
      <body className={twMerge(inter.className, styles.body)}>
        <nav className={styles['navbar']}>
          <div className={styles['navbar-links']}>
            <NavigationItem href="/">Home</NavigationItem>
            <NavigationItem href="/about">About</NavigationItem>
            <NavigationItem href="/about">Projects</NavigationItem>
            <NavigationItem href="/about">Blogs</NavigationItem>
          </div>
          <div className={styles['navbar-utils']} />
        </nav>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>Copyright &copy; 2023 Hokki Suwanda. All rights reserved.</footer>
      </body>
    </html>
  );
});

export default RootLayout;
