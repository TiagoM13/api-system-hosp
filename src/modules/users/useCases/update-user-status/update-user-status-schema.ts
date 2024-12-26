import { Status } from '@prisma/client';
import z from 'zod';

export const updateUserStatusSchema = z
  .object({
    status: z.nativeEnum(Status),
  })
  .strict();

export type UpdateUserStatusDTO = z.infer<typeof updateUserStatusSchema>;
