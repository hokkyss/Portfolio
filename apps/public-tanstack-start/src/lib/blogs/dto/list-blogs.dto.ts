import z from 'zod';

export const listBlogsRequestDto = z.object({
  cursor: z.string().optional(),
  limit: z.number().min(1).max(50).optional().default(10),
});

export type ListBlogsRequestDto = z.input<typeof listBlogsRequestDto>;

export const listBlogsResponseDto = z.object({
  items: z.array(
    z.object({
      categories: z.union([
        z.null().transform(() => []),
        z.array(z.string()),
      ]),
      content: z.string().default(''),
      createdAt: z.iso.datetime().pipe(z.coerce.date()),
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      updatedAt: z.iso.datetime().pipe(z.coerce.date()),
    }),
  ),
  nextCursor: z
    .object({
      cursor: z.string(),
    })
    .nullable(),
});

export type ListBlogsResponseDto = z.output<typeof listBlogsResponseDto>;
