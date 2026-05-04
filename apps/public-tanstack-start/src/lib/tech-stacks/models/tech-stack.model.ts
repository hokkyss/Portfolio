import z from 'zod';

export const techStackModel = z
  .object({
    icon: z.string(),
    id: z.string(),
    name: z.string(),
  })
  .brand('TechStackModel');

export interface TechStackModel
  extends z.infer<typeof techStackModel> {}
