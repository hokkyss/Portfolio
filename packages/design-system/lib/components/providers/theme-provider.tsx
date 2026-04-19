import { type PropsWithChildren } from 'react';
import { type ApplicationTheme, ThemeContext } from '@/contexts/theme-context';

/**
 *
 * @param root0
 * @param root0.children
 * @param root0.theme
 */
export function ThemeProvider({ children, theme }: PropsWithChildren<{ theme: ApplicationTheme }>) {
  return <ThemeContext value={theme}>{children}</ThemeContext>;
}
