import z from 'zod';

import { MIN_LENGTH_PASSWORD, MAX_LENGTH_PASSWORD } from '@shared/utils';

export const changePasswordUserSchema = z
  .object({
    password: z
      .string()
      .min(6, MIN_LENGTH_PASSWORD)
      .max(20, MAX_LENGTH_PASSWORD)
      .trim(),
  })
  .strict();

export type ChangePasswordUserDTO = z.infer<typeof changePasswordUserSchema>;
