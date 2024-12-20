import { Role } from '@prisma/client';
import z from 'zod';

import { NAME_FIELD_REQUIRED } from '@shared/utils';

export const updateUserSchema = z
  .object({
    name: NAME_FIELD_REQUIRED,
    email: z.string().email().trim(),
    role: z.nativeEnum(Role),
    image_url: z.string().nullable(),
  })
  .partial()
  .strict();

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
