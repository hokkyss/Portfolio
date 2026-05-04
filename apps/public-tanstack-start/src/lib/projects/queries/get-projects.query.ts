import { queryOptions } from '@tanstack/react-query';
import { GetProjectResponseDto } from '../dto/get-project.dto';
import getProjectsFunction from '../functions/get-projects.function';

interface GetProjectsQueryProps<Selected = GetProjectResponseDto> {
  selector?: (data: GetProjectResponseDto) => Selected;
}

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
