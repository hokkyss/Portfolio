import ApplicationError from '@portfolio/common/errors/application-error';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import dedent from 'dedent';
import z from 'zod';
import { getProjectRequestDto, getProjectResponseDto } from '../dto/get-projects.dto';

const getProjectsFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(getProjectRequestDto)
  .handler(async (ctx) => {
    const request = getRequest();

    const result = await ctx.context.sanityClient.fetch<unknown>(
      dedent`
* [_type == 'project'] | order(orderRank) {
  "id": _id,
  links,
  name,
  summary,
  "thumbnail": thumbnail.asset-> {
    "blurDataURL": metadata.lqip,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "aspectRatio": metadata.dimensions.aspectRatio,
    url,
    "filename": originalFilename
  },
  techStacks[] -> {
    "id": _id,
    name,
    icon
  },
  description
}
`,
      {},
      {
        perspective: 'published',
        returnQuery: true,
        signal: request.signal,
      },
    );

    const parseResult = getProjectResponseDto.safeParse(result);

    if (!parseResult.success) {
      throw new ApplicationError(500, `CMS Response did not match expected shape`)
        .addPayload('zodError', z.treeifyError(parseResult.error));
    }

    return parseResult.data;
  });

export default getProjectsFunction;
