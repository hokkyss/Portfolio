import { z } from 'zod';

const techStackSchema = z.object({
  icon: z.string(),
  name: z.string(),
});

export type TechStack = z.infer<typeof techStackSchema>;

export default techStackSchema;
