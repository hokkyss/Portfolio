import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import isValidApplicationTheme from '@portfolio/design-system/is-valid-application-theme';
import { createServerFn } from '@tanstack/react-start';
import { getCookie, setCookie } from '@tanstack/react-start/server';
import { milliseconds } from 'date-fns/milliseconds';
import { millisecondsToSeconds } from 'date-fns/millisecondsToSeconds';

const getApplicationThemeFunction = createServerFn({
  method: 'GET',
}).handler(() => {
  const fromCookie = getCookie('th');

  if (!isValidApplicationTheme(fromCookie)) {
    const defaultTheme: ApplicationTheme = 'light';

    // theme is not stored in cookie, or is invalid
    setCookie('th', defaultTheme, {
      httpOnly: true,
      maxAge: millisecondsToSeconds(milliseconds({
        years: 300,
      })),
      path: '/',
      priority: 'low',
      sameSite: 'strict',
    });

    return defaultTheme;
  }

  return fromCookie;
});

export default getApplicationThemeFunction;
