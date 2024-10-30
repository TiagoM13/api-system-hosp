import z from 'zod';

import { Role } from '@shared/enums';
import { NAME_FIELD_REQUIRED } from '@shared/utils';

export const createUserSchema = z
  .object({
    name: NAME_FIELD_REQUIRED,
    email: z.string().email().trim(),
    role: z.nativeEnum(Role),
    image_url: z.string().nullable().optional(),
  })
  .strict();

export type CreateUserDTO = z.infer<typeof createUserSchema>;
