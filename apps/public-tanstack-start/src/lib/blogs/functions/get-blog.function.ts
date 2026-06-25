import ApplicationError from '@portfolio/common/errors/application-error';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import dedent from 'dedent';
import z from 'zod';
import { getBlogRequestDto, getBlogResponseDto } from '../dto/get-blog.dto';

const getBlogFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(getBlogRequestDto)
  .handler(async (ctx) => {
    const request = getRequest();

    const result = await ctx.context.sanityClient.fetch<unknown>(
      dedent`
        * [_type == 'blog' && slug.current == $slug][0] {
          "id": _id,
          "slug": slug.current,
          title,
          "updatedAt": _updatedAt,
          categories,
          content
        }
      `,
      { slug: ctx.data.slug },
      {
        perspective: 'published',
        returnQuery: true,
        signal: request.signal,
      },
    );

    if (!result) {
      throw new ApplicationError(404, `Blog ${ctx.data.slug} not found`);
    }

    const parseResult = getBlogResponseDto.safeParse(result);

    if (!parseResult.success) {
      throw new ApplicationError(500, 'CMS Response did not match expected shape')
        .addPayload('zodError', z.treeifyError(parseResult.error));
    }

    return parseResult.data;
  });

export default getBlogFunction;
