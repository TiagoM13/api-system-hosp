import z from 'zod';

import { Status } from '@shared/enums';

export const updateUserStatusSchema = z
  .object({
    status: z.nativeEnum(Status),
  })
  .strict();

export type UpdateUserStatusDTO = z.infer<typeof updateUserStatusSchema>;
