'use client';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import { Link, LinkOptions } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import ThemeSwitcher from './theme-switcher.molecule';

const NAV_LINKS: { label: string; to: LinkOptions }[] = [
  { label: 'About', to: { hash: 'about', to: '/' } },
  { label: 'Experience', to: { hash: 'experience', to: '/' } },
  { label: 'Projects', to: { hash: 'projects', to: '/' } },
  { label: 'Contact', to: { hash: 'contact', to: '/' } },
];

interface NavBarProps {
  className?: string;
}

/**
 * Fixed top navigation bar with brand, anchor links, and theme switcher.
 * @param root0
 * @param root0.className
 */
export default function NavBar({ className }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        tw`fixed inset-x-0 top-0 z-40 transition-all duration-300`,
        scrolled && tw`border-b border-border bg-background/80 backdrop-blur-md`,
        className,
      )}
      id="navbar"
    >
      <nav
        className={tw`mx-auto flex max-w-6xl items-center justify-between px-6 py-4`}
        role="navigation"
      >
        {/* Brand */}
        <Link
          className={tw`font-mono text-sm font-bold tracking-tight text-foreground transition-colors hover:text-primary`}
          id="nav-brand"
          to="/"
        >
          <span className={tw`text-primary`}>i-am</span>
          <span className={tw`text-muted-foreground`}>.hokkyss.com</span>
        </Link>

        {/* Nav links — hidden on mobile */}
        <ul className={tw`hidden items-center gap-6 md:flex`} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground`}
                id={`nav-link-${link.label.toLowerCase()}`}
                {...link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground`}
              id="nav-link-blogs"
              to="/blog"
            >
              Blogs
            </Link>
          </li>
        </ul>

        {/* Theme switcher */}
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
