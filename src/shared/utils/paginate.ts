import { z } from 'zod';

export const paginateSchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('1'),
  items_per_page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('10'),
});

export type PaginateType = z.infer<typeof paginateSchema>;
