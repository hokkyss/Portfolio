import z from 'zod';
import { techStackModel } from './tech-stack.model';

export const techModel = z
  .object({
    id: z.string(),
    name: z.string(),
    techStacks: z.array(techStackModel),
  })
  .brand('TechModel');

export type TechModel = z.infer<typeof techModel>;
