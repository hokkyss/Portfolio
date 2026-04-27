import { queryOptions } from '@tanstack/react-query';
import { GetTechStacksResponseDto } from '../dto/get-tech-stacks.dto';
import getTechStacksFunction from '../functions/get-tech-stacks.function';

interface GetTechStacksQueryProps<Selected = GetTechStacksResponseDto> {
  selector?: (data: GetTechStacksResponseDto) => Selected;
}

export default function getTechStacksQuery<Selected = GetTechStacksResponseDto>({
  selector,
}: GetTechStacksQueryProps<Selected> = {}) {
  return queryOptions({
    queryFn: async ({ signal }) =>
      getTechStacksFunction({
        data: {},
        signal,
      }),
    queryKey: ['tech-stacks'] as const,
    select: selector,
  });
}
