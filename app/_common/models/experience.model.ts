import { z } from 'zod';

import { parseDate } from '../utils/date.util';

import techStackSchema from './tech-stack.model';

const experienceSchema = z.object({
  company: z.object({
    id: z.string(),
    link: z.string().url(),
    name: z.string(),
  }),
  description: z.string(),
  from: z.string().transform((val) => parseDate(val)),
  id: z.string(),
  role: z.string(),
  techStacks: z.array(techStackSchema).min(1),
  to: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? parseDate(val) : null)),
});

export const generateExperienceCardId = (id: string) => `experience-${id}`;

export default experienceSchema;
export type Experience = z.infer<typeof experienceSchema>;
