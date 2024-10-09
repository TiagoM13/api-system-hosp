import { z } from 'zod';

export const paramSchema = z.object({ id: z.string().uuid() }).strict();
