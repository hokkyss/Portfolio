'use client';

import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import { LeafIcon, MoonIcon, ShieldIcon, SunIcon, SwordIcon } from '@phosphor-icons/react';
import Button from '@portfolio/design-system/button';
import cn from '@portfolio/design-system/cn';
import DropdownMenu from '@portfolio/design-system/dropdown-menu';
import DropdownMenuContent from '@portfolio/design-system/dropdown-menu-content';
import DropdownMenuItem from '@portfolio/design-system/dropdown-menu-item';
import DropdownMenuTrigger from '@portfolio/design-system/dropdown-menu-trigger';
import tw from '@portfolio/design-system/tw';
import useApplicationTheme from '@portfolio/design-system/use-application-theme';
import { useMutation } from '@tanstack/react-query';
import setApplicationThemeMutation from '../../lib/common/mutations/set-application-theme.mutation';
import getApplicationThemeQuery from '../../lib/common/queries/get-application-theme.query';

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
 * Theme switcher molecule for the FE3H calculator app.
 */
export default function ThemeSwitcher() {
  const theme = useApplicationTheme();
  const { mutate } = useMutation({
    ...setApplicationThemeMutation(),
    onSuccess(data, _variables, _onMutateResult, context) {
      context.client.setQueryData(getApplicationThemeQuery().queryKey, data);
    },
    onMutate(variables, context) {
      context.client.setQueryData(getApplicationThemeQuery().queryKey, variables);
    },
  });
  const current = THEMES.find((t) => t.value === theme) ?? THEMES[0]!;

  return (
    <div className={tw`relative`} id="theme-switcher">
      <DropdownMenu>
        <DropdownMenuTrigger render={(
          <Button
            className={tw`sm:w-40`}
            id="theme-switcher-button"
            type="button"
            variant="outline"
          >
            <span className={tw`text-base`}>{current.icon}</span>
            <span className={tw`hidden sm:inline`}>{current.label}</span>
          </Button>
        )}
        >
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={tw`min-w-40`}>
          {THEMES.map((t) => (
            <DropdownMenuItem
              id={`theme-option-${t.value}`}
              key={t.value}
              onClick={() => mutate(t.value)}
              render={(
                <Button
                  className={cn(
                    tw`w-full justify-start gap-3`,
                    t.value === theme && tw`bg-primary/10 font-semibold text-primary`,
                  )}
                  variant="ghost"
                />
              )}
            >
              <span className={tw`text-base`}>{t.icon}</span>
              {t.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
