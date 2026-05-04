import type { ApplicationTheme } from '@/contexts/theme-context';

/**
 *
 * @param theme
 */
export function isValidTheme(theme: unknown): theme is ApplicationTheme {
  if (typeof theme !== 'string') {
    return false;
  }

  const validThemes: ApplicationTheme[] = ['black-eagles', 'blue-lions', 'dark', 'golden-deer', 'light'];

  return validThemes.includes(theme as never);
}
