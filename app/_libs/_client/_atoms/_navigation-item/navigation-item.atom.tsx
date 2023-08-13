'use client';

import type { Route } from 'next';
import type { ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

interface NavigationItemProps {
  children: ReactNode;
  href: Route;
}

export default function NavigationItem(props: NavigationItemProps) {
  const { children, href } = props;
  const pathname = usePathname();

  return (
    <Link className={twMerge('px-3 hover:underline', pathname === href && 'text-blue-500 drop-shadow-sm')} href={href}>
      {children}
    </Link>
  );
}
