import { z } from 'zod';

import { parseDate } from '../utils/date.util';

const experienceSchema = z.object({
  company: z.object({
    link: z.string().url(),
    name: z.string(),
  }),
  description: z.string(),
  from: z.string().transform((val) => parseDate(val)),
  id: z.string(),
  role: z.string(),
  techStacks: z.array(z.string()).min(1),
  to: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val ? parseDate(val) : null)),
});

export default experienceSchema;
export type Experience = z.infer<typeof experienceSchema>;
