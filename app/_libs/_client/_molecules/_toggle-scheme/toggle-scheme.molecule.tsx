'use client';

import 'client-only';

import { twMerge } from 'tailwind-merge';

export default function ToggleScheme() {
  return (
    <button
      onClick={() => {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.add('dark');
        }
      }}
      className={twMerge('h-full aspect-square', 'dark:bg-dark bg-light')}
    />
  );
}
