import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import isValidApplicationTheme from '@portfolio/design-system/is-valid-application-theme';
import { createServerFn } from '@tanstack/react-start';
import { setCookie } from '@tanstack/react-start/server';
import { milliseconds } from 'date-fns/milliseconds';
import { millisecondsToSeconds } from 'date-fns/millisecondsToSeconds';
import { z } from 'zod/v4';

const setApplicationThemeFunction = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ theme: z.string() }))
  .handler(({ data }) => {
    const { theme } = data;

    if (!isValidApplicationTheme(theme)) {
      throw new Error(`Invalid theme: ${theme}`);
    }

    const validatedTheme: ApplicationTheme = theme;

    setCookie('th', validatedTheme, {
      httpOnly: true,
      maxAge: millisecondsToSeconds(milliseconds({ years: 300 })),
      path: '/',
      priority: 'low',
      sameSite: 'strict',
    });

    return validatedTheme;
  });

export default setApplicationThemeFunction;
