import { queryOptions } from '@tanstack/react-query';
import { GetProjectResponseDto } from '../dto/get-projects.dto';
import getProjectsFunction from '../functions/get-projects.function';

interface GetProjectsQueryProps<Selected = GetProjectResponseDto> {
  selector?: (data: GetProjectResponseDto) => Selected;
}

/**
 *
 * @param root0
 * @param root0.selector
 */
export default function getProjectsQuery<Selected = GetProjectResponseDto>({
  selector,
}: GetProjectsQueryProps<Selected> = {}) {
  return queryOptions({
    queryFn: async ({ signal }) =>
      getProjectsFunction({
        data: {},
        signal,
      }),
    queryKey: ['projects'] as const,
    select: selector,
  });
}
