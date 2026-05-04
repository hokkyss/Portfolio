import { queryOptions } from '@tanstack/react-query';
import { GetExperienceResponseDto } from '../dto/get-experience.dto';
import getExperiencesFunction from '../functions/get-experiences.function';

interface GetExperiencesQueryProps<Selected = GetExperienceResponseDto> {
  selector?: (data: GetExperienceResponseDto) => Selected;
}

/**
 *
 * @param root0
 * @param root0.personaId
 * @param root0.selector
 */
export default function getExperiencesQuery<Selected = GetExperienceResponseDto>({
  selector,
}: GetExperiencesQueryProps<Selected>) {
  return queryOptions({
    queryFn: async ({ signal }) =>
      getExperiencesFunction({
        data: { },
        signal,
      }),
    queryKey: ['experiences'] as const,
    select: selector,
  });
}
