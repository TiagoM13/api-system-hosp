import z from 'zod';

import { Role } from '@shared/enums/role';
import { Status } from '@shared/enums/status';

export const userDataSchema = z.object({
  name: z.string().min(3).max(255).trim(),
  email: z.string().email().trim(),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status).optional(),
  image_url: z.string().nullable().optional(),
});

export const changePasswordUserSchema = z.object({
  password: z.string().min(6).max(20).trim(),
  confirm_password: z.string().min(6).max(20).trim(),
});

export type UserDataType = z.infer<typeof userDataSchema>;
