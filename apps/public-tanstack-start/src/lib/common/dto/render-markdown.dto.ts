import z from 'zod';

export const renderMarkdownRequestDto = z.object({
  content: z.string(),
});

export type RenderMarkdownRequestDto = z.input<typeof renderMarkdownRequestDto>;
