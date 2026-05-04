import type { ApplicationTheme } from '@portfolio/design-system/application-theme-provider';
import { queryOptions } from '@tanstack/react-query';
import getApplicationThemeFunction from '../functions/get-application-theme.function';

interface GetApplicationThemeQueryProps<Selected = ApplicationTheme> {
  selector?: (data: ApplicationTheme) => Selected;
}

/**
 *
 * @param root0
 * @param root0.selector
 */
export default function getApplicationThemeQuery<Selected = ApplicationTheme>({
  selector,
}: GetApplicationThemeQueryProps<Selected> = {}) {
  return queryOptions({
    queryFn: async ({ signal }) =>
      getApplicationThemeFunction({
        signal,
      }),
    queryKey: ['THEME'] as const,
    select: selector,
    staleTime: Infinity,
  });
}
