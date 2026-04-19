import { use } from 'react';
import { ThemeContext } from '@/contexts/theme-context';

/**
 *
 */
export function useTheme() {
  const theme = use(ThemeContext);

  if (theme === null) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return theme;
}
