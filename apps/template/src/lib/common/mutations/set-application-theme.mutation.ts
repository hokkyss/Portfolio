import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import { mutationOptions } from '@tanstack/react-query';
import setApplicationThemeFunction from '../functions/set-application-theme.function';

/**
 *
 * @param props
 */
export default function setApplicationThemeMutation() {
  return mutationOptions({
    mutationFn: (value: ApplicationTheme) => setApplicationThemeFunction({
      data: {
        theme: value,
      },
    }),
    mutationKey: ['MUTATION', 'THEME'] as const,
  });
}
