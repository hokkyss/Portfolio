import './globals.css';

import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import NavigationItem from './_libs/_client/_atoms/_navigation-item/navigation-item.atom';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  colorScheme: 'light dark',
  description:
    "I'm Hokki Suwanda, a fullstack software engineer. A Computer Science Fresh Graduate. A graduated undergraduate student full of enthusiasm and motivation with problem solving capabilities. Very excited to learn something new. Always fulfilling all responsibilities heartfully. Pursuing career as a fullstack software engineer. Used quite lot of tech stacks.",
  title: 'hokkyss | Hokki Suwanda',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, 'flex flex-col')}>
        <nav
          className={twMerge(
            'fixed left-0 top-0 right-0',
            'flex justify-between',
            'backdrop-blur-md',
            'bg-gradient-to-b dark:from-inherit from-zinc-200 dark:bg-zinc-800/30 lg:dark:bg-zinc-800/30',
            'p-6 lg:p-4',
          )}
        >
          <div className="flex gap-x-2">
            <NavigationItem href="/">Home</NavigationItem>
            <NavigationItem href="/about">About</NavigationItem>
            <NavigationItem href="/about">Projects</NavigationItem>
            <NavigationItem href="/about">Blogs</NavigationItem>
            <NavigationItem href="/about">Contact</NavigationItem>
          </div>
          <div className="flex" />
        </nav>
        <main className="pt-24 pb-32 min-h-screen h-screen">{children}</main>
        <footer
          className={twMerge(
            'h-32 w-full',
            'flex items-end justify-center',
            'fixed bottom-0 left-0 right-0',
            'bg-gradient-to-t from-white via-white dark:from-black dark:via-black',
            'pb-6',
            'text-xs',
          )}
        >
          Copyright &copy; 2023 Hokki Suwanda. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
