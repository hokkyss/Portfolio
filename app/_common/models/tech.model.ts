import { z } from 'zod';

import techStackSchema from './tech-stack.model';

const techSchema = z.object({
  id: z.string(),
  name: z.string(),
  techStacks: z.array(techStackSchema),
});

export type Tech = z.infer<typeof techSchema>;

export default techSchema;
