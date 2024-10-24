import { z } from 'zod';

export const uuidParamSchema = z.object({ id: z.string().uuid() }).strict();

export const intIdParamSchema = z.object({ id: z.coerce.number().int() });
