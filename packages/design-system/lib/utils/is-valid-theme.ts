import type { ApplicationTheme } from '@/contexts/theme-context';

/**
 *
 * @param theme
 */
export function isValidTheme(theme: unknown): theme is ApplicationTheme {
  if (typeof theme !== 'string') {
    return false;
  }

  const validThemes: ApplicationTheme[] = ['dark', 'light'];

  return validThemes.includes(theme as never);
}
