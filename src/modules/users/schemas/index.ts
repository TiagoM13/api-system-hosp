import z from 'zod';

import { Role, Status } from '@shared/enums';
import {
  MaxLengthPassword,
  MinLengthPassword,
  NameFieldRequired,
} from '@shared/utils';

export const userDataSchema = z.object({
  name: NameFieldRequired,
  email: z.string().email().trim(),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status).optional(),
  image_url: z.string().nullable().optional(),
});

export const changePasswordUserSchema = z.object({
  password: z
    .string()
    .min(6, MinLengthPassword)
    .max(20, MaxLengthPassword)
    .trim(),
  confirm_password: z
    .string()
    .min(6, MinLengthPassword)
    .max(20, MaxLengthPassword)
    .trim(),
});

export type UserDataType = z.infer<typeof userDataSchema>;
