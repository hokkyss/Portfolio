import z from 'zod';

export const getBlogRequestDto = z.object({
  slug: z.string(),
});

export type GetBlogRequestDto = z.input<typeof getBlogRequestDto>;

export const getBlogResponseDto = z.object({
  categories: z.union([
    z.null().transform(() => <string[]>[]),
    z.array(z.string()),
  ]),
  content: z.string().default(''),
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  updatedAt: z.iso.datetime().pipe(z.coerce.date()),
});

export type GetBlogResponseDto = z.output<typeof getBlogResponseDto>;
