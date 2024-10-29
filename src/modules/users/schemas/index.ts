import z from 'zod';

import { Role, Status } from '@shared/enums';
import {
  MAX_LENGTH_PASSWORD,
  MIN_LENGTH_PASSWORD,
  NAME_FIELD_REQUIRED,
} from '@shared/utils';

export const userDataSchema = z.object({
  name: NAME_FIELD_REQUIRED,
  email: z.string().email().trim(),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status).optional(),
  image_url: z.string().nullable().optional(),
});

export const changePasswordUserSchema = z.object({
  password: z
    .string()
    .min(6, MIN_LENGTH_PASSWORD)
    .max(20, MAX_LENGTH_PASSWORD)
    .trim(),
  confirm_password: z
    .string()
    .min(6, MIN_LENGTH_PASSWORD)
    .max(20, MAX_LENGTH_PASSWORD)
    .trim(),
});

export type UserDataType = z.infer<typeof userDataSchema>;
