import z from 'zod';
import { techStackModel } from '../../tech-stacks/models/tech-stack.model';

export const experienceModel = z.object({
  company: z.object({
    id: z.string(),
    link: z.string().url(),
    name: z.string(),
  }),
  description: z.string(),
  from: z.iso.date(),
  id: z.string(),
  role: z.string(),
  techStacks: z.array(techStackModel).min(1),
  to: z.iso.date().optional().nullable(),
}).brand('ExperienceModel');

export type ExperienceModel = z.infer<typeof experienceModel>;
