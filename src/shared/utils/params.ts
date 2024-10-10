import { z } from 'zod';

export const paramSchema = z.object({ id: z.string().uuid() }).strict();

export const paramIdSchema = z.object({ id: z.coerce.number().int() });
