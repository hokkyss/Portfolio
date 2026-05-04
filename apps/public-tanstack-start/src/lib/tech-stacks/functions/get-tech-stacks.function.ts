import ApplicationError from '@portfolio/common/errors/application-error';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import dedent from 'dedent';
import sanityClient from '../../../clients/sanity/sanity.client';
import { getTechStacksRequestDto, getTechStacksResponseDto } from '../dto/get-tech-stacks.dto';

const getTechStacksFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(getTechStacksRequestDto)
  .handler(async () => {
    const request = getRequest();

    const result = await sanityClient.fetch<unknown>(
      dedent`
*[_type == "tech"] | order(orderRank) {
  "id": _id,
  name,
  "techStacks": techStacks[]->{
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

    const parseResult = getTechStacksResponseDto.safeParse(result);

    if (!parseResult.success) {
      throw new ApplicationError(500, `CMS Response did not match expected shape`)
        .addPayload('zodError', parseResult.error);
    }

    return parseResult.data;
  });

export default getTechStacksFunction;
