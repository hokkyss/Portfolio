import type { StaticImageData } from 'next/image';

import { z } from 'zod';

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
  relatedExperiences: z.array(z.string()),
  summary: z.string(),
  techStacks: z.array(z.string()).min(1),
  thumbnail: z.string().or(z.custom<StaticImageData>()),
});

export const generateProjectCardId = (id: string) => `project-${id}`;

export default projectSchema;
export type Project = z.infer<typeof projectSchema>;
