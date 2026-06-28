import z from 'zod';
import { techStackModel } from '../../tech-stacks/models/tech-stack.model';

export const projectModel = z
  .object({
    description: z.union([
      z.null().transform(() => ''),
      z.string(),
    ]),
    id: z.string(),
    links: z.object({
      appStore: z.string().url().optional(),
      github: z.string().url().optional(),
      playStore: z.string().url().optional(),
      website: z.string().url().optional(),
    }),
    name: z.string(),
    summary: z.string(),
    techStacks: z.array(techStackModel).min(1),
    thumbnail: z.object({
      aspectRatio: z.number(),
      blurDataURL: z.string().startsWith('data:image'),
      filename: z.string(),
      height: z.number(),
      url: z.string(),
      width: z.number(),
    }).optional().nullable(),
  })
  .brand('ProjectModel');

export const generateProjectCardId = (id: string) => `project-${id}`;

export type ProjectModel = z.infer<typeof projectModel>;
