'use client';

import type { Route } from 'next';
import type { CSSProperties, ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface NavigationItemProps {
  children: ReactNode;
  className?: string;
  href: Route;
  style?: CSSProperties;
}

const NavigationItem = forwardRef<HTMLAnchorElement, NavigationItemProps>((props, ref) => {
  const { children, href } = props;
  const pathname = usePathname();

  return (
    <Link
      className={twMerge('px-3 hover:underline transition-all', pathname === href && 'text-blue-500 drop-shadow-sm')}
      href={href}
      ref={ref}
    >
      {children}
    </Link>
  );
});

export default NavigationItem;
