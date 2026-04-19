import { createContext } from 'react';

export type ApplicationTheme = 'dark' | 'light';

export const ThemeContext = createContext<ApplicationTheme | null>(null);
