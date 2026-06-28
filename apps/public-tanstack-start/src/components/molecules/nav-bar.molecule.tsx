'use client';

import cn from '@portfolio/design-system/cn';
import NavigationMenu from '@portfolio/design-system/navigation-menu';
import NavigationMenuItem from '@portfolio/design-system/navigation-menu-item';
import NavigationMenuList from '@portfolio/design-system/navigation-menu-list';
import tw from '@portfolio/design-system/tw';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import ThemeSwitcher from './theme-switcher.molecule';

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
      <NavigationMenu
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
        <NavigationMenuList className={tw`hidden md:flex gap-6`}>
          <NavigationMenuItem>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent`}
              hash="about"
              to="/"
            >
              About
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent`}
              hash="experience"
              to="/"
            >
              Experience
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent`}
              hash="projects"
              to="/"
            >
              Projects
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent`}
              hash="contact"
              to="/"
            >
              Contact
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              className={tw`text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent`}
              to="/blog"
            >
              Blogs
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        {/* Theme switcher */}
        <ThemeSwitcher />
      </NavigationMenu>
    </header>
  );
}
