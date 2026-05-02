'use client';

import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import cn from '@portfolio/design-system/cn';
import useApplicationTheme from '@portfolio/design-system/use-application-theme';
import tw from '@portfolio/design-system/tw';
import { useQueryClient } from '@tanstack/react-query';
import { MoonIcon, SunIcon, SwordIcon, ShieldIcon, LeafIcon } from '@phosphor-icons/react';
import setApplicationThemeFunction from '../../lib/common/functions/set-application-theme.function';

interface ThemeOption {
  icon: React.ReactNode;
  label: string;
  value: ApplicationTheme;
}

const THEMES: ThemeOption[] = [
  { icon: <SunIcon weight="fill" />, label: 'Light', value: 'light' },
  { icon: <MoonIcon weight="fill" />, label: 'Dark', value: 'dark' },
  { icon: <SwordIcon weight="fill" />, label: 'Black Eagles', value: 'black-eagles' },
  { icon: <ShieldIcon weight="fill" />, label: 'Blue Lions', value: 'blue-lions' },
  { icon: <LeafIcon weight="fill" />, label: 'Golden Deer', value: 'golden-deer' },
];

/**
 * Dropdown that lets the user switch between the 5 available themes.
 * Immediately updates the query cache for instant visual feedback, and
 * persists the choice via a server function that sets the cookie.
 */
export default function ThemeSwitcher() {
  const theme = useApplicationTheme();
  const queryClient = useQueryClient();
  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0]!;

  async function handleSelect(value: ApplicationTheme) {
    // Optimistic update — updates data-theme on <html> immediately
    queryClient.setQueryData(['THEME'], value);

    try {
      await setApplicationThemeFunction({ data: { theme: value } });
    } catch {
      // Roll back on error
      queryClient.setQueryData(['THEME'], theme);
    }
  }

  return (
    <div className={tw`relative`} id="theme-switcher">
      <details className={tw`group`}>
        <summary
          className={tw`flex cursor-pointer list-none items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground`}
          id="theme-switcher-button"
        >
          <span className={tw`text-base`}>{current.icon}</span>
          <span className={tw`hidden sm:inline`}>{current.label}</span>
          <svg
            className={tw`h-3 w-3 transition-transform group-open:rotate-180`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>

        <div
          className={tw`absolute right-0 top-full z-50 mt-1 min-w-[160px] overflow-hidden rounded-lg border border-border bg-popover shadow-lg`}
        >
          {THEMES.map((t) => (
            <button
              className={cn(
                tw`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground`,
                t.value === theme && tw`bg-primary/10 font-semibold text-primary`,
              )}
              id={`theme-option-${t.value}`}
              key={t.value}
              onClick={() => handleSelect(t.value)}
              type="button"
            >
              <span className={tw`text-base`}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
