import { createContext } from 'react';

export type ApplicationTheme = 'black-eagles' | 'blue-lions' | 'dark' | 'golden-deer' | 'light';

export const ThemeContext = createContext<ApplicationTheme | null>(null);
