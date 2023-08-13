import { z } from 'zod';

const todoSchema = z.object({
  completed: z.boolean(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export type Todo = z.infer<typeof todoSchema>;

export default todoSchema;
