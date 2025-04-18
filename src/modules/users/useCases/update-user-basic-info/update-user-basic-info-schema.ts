import z from 'zod';

import {
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  NAME_FIELD_REQUIRED,
} from '@shared/utils';

export const updateUserBasicInfoSchema = z
  .object({
    name: NAME_FIELD_REQUIRED,
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(6, MIN_LENGTH_PASSWORD)
      .max(20, MAX_LENGTH_PASSWORD)
      .trim(),
  })
  .strict()
  .partial();

export type UpdateUserBasicInfoDTO = z.infer<typeof updateUserBasicInfoSchema>;
