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
      appStore: z.url().optional(),
      github: z.url().optional(),
      playStore: z.url().optional(),
      website: z.url().optional(),
    }),
    name: z.string(),
    summary: z.string(),
    techStacks: z.array(techStackModel).min(1),
  })
  .brand('ProjectModel');

export const generateProjectCardId = (id: string) => `project-${id}`;

export type ProjectModel = z.infer<typeof projectModel>;
