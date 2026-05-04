import ApplicationError from '@portfolio/common/errors/application-error';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import dedent from 'dedent';
import sanityClient from '../../../clients/sanity/sanity.client';
import { getExperienceRequestDto, getExperienceResponseDto } from '../dto/get-experience.dto';

const getExperiencesFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(getExperienceRequestDto)
  .handler(async () => {
    const request = getRequest();

    const result = await sanityClient.fetch<unknown>(
      dedent`
* [_type == "experience"] | order(to desc, orderRank) {
  "id": _id,
  description,
  from,
  to,
  role,
  company -> {
    "id": _id,
    name,
    link
  },
  techStacks[] -> {
    "id": _id,
    name,
    icon
  }
}
`,
      {},
      {
        perspective: 'published',
        returnQuery: true,
        signal: request.signal,
      },
    );

    const parseResult = getExperienceResponseDto.safeParse(result);

    if (!parseResult.success) {
      throw new ApplicationError(500, `CMS Response did not match expected shape`)
        .addPayload('zodError', parseResult.error);
    }

    return parseResult.data;
  });

export default getExperiencesFunction;
