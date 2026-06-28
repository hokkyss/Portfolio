import ApplicationError from '@portfolio/common/errors/application-error';
import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import dedent from 'dedent';
import z from 'zod';
import { listBlogsRequestDto, listBlogsResponseDto } from '../dto/list-blogs.dto';

const listBlogsFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(listBlogsRequestDto)
  .handler(async (ctx) => {
    const request = getRequest();

    const query = ctx.data.cursor
      ? dedent`
        * [_type == 'blog' && _id <= $cursor] | order(_createdAt desc, _id desc) [0...$limit] {
          "id": _id,
          "slug": slug.current,
          title,
          "updatedAt": _updatedAt,
          "createdAt": _createdAt,
          categories,
          content
        }`
      : dedent`
        * [_type == 'blog'] | order(_createdAt desc, _id desc) [0...$limit] {
          "id": _id,
          "slug": slug.current,
          title,
          "updatedAt": _updatedAt,
          "createdAt": _createdAt,
          categories,
          content
        }`;

    const result = await ctx.context.sanityClient.fetch<Record<string, unknown>[]>(
      query,
      {
        cursor: ctx.data.cursor,
        limit: ctx.data.limit + 1,
      },
      {
        perspective: 'published',
        returnQuery: true,
        signal: request.signal,
      },
    );

    let nextCursor = null;

    if (result.length > ctx.data.limit) {
      const lastItem = result.pop();
      nextCursor = {
        // `lastItem` is guaranteed to be at least 1 element.
        cursor: lastItem!.id,
      };
    }

    const payload = {
      items: result,
      nextCursor: nextCursor,
    };

    const parseResult = listBlogsResponseDto.safeParse(payload);

    if (!parseResult.success) {
      throw new ApplicationError(500, 'CMS Response did not match listBlogsResponseDto')
        .addPayload('zodError', z.treeifyError(parseResult.error));
    }

    return parseResult.data;
  });

export default listBlogsFunction;
