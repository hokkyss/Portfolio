import { z } from 'zod';

import techStackSchema from './tech-stack.model';

const projectSchema = z.object({
  description: z.string(),
  id: z.string(),
  links: z.object({
    appStore: z.string().url().optional(),
    github: z.string().url().optional(),
    playStore: z.string().url().optional(),
    website: z.string().url().optional(),
  }),
  name: z.string(),
  summary: z.string(),
  techStacks: z.array(techStackSchema).min(1),
  thumbnail: z.object({
    aspectRatio: z.number(),
    blurDataURL: z.string().startsWith('data:image'),
    filename: z.string(),
    height: z.number(),
    url: z.string(),
    width: z.number(),
  }),
});

export const generateProjectCardId = (id: string) => `project-${id}`;

export default projectSchema;
export type Project = z.infer<typeof projectSchema>;
