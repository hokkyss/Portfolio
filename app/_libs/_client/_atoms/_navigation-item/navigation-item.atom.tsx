'use client';

import type { Route } from 'next';
import type { CSSProperties, ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './navigation-item.module.css';

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
    <Link className={twMerge(styles.link, pathname === href && styles['current-link'])} href={href} ref={ref}>
      {children}
    </Link>
  );
});

export default NavigationItem;
