'use client';

import 'client-only';

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

const linkStyle = 'px-3 hover:underline transition-all';
const currentLinkStyle = 'text-blue-500 drop-shadow-sm';

const NavigationItem = forwardRef<HTMLAnchorElement, NavigationItemProps>((props, ref) => {
  const { children, href } = props;
  const pathname = usePathname();

  return (
    <Link className={twMerge(linkStyle, pathname === href && currentLinkStyle)} href={href} ref={ref}>
      {children}
    </Link>
  );
});

export default NavigationItem;
