import { BookOpenTextIcon, SquaresFourIcon } from '@phosphor-icons/react';
import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import { Link } from '@tanstack/react-router';

interface MobileTabBarProps {
  className?: string;
}

/**
 * Mobile bottom tab bar for navigation on small screens.
 * @param props
 * @param props.className
 */
export default function MobileTabBar({ className }: MobileTabBarProps) {
  return (
    <nav
      className={cn(
        tw`fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background/80 backdrop-blur-md md:hidden`,
        className,
      )}
      role="navigation"
    >
      <Link
        activeProps={{ className: tw`text-primary` }}
        className={tw`flex flex-1 flex-col items-center justify-center gap-y-1 py-2 text-muted-foreground transition-colors hover:text-foreground`}
        to="/"
      >
        <SquaresFourIcon size={24} />
        <span className={tw`text-[10px] font-medium`}>Overview</span>
      </Link>

      <Link
        activeProps={{ className: tw`text-primary` }}
        className={tw`flex flex-1 flex-col items-center justify-center gap-y-1 py-2 text-muted-foreground transition-colors hover:text-foreground`}
        to="/blog"
      >
        <BookOpenTextIcon size={24} />
        <span className={tw`text-[10px] font-medium`}>Blogs</span>
      </Link>
    </nav>
  );
}
