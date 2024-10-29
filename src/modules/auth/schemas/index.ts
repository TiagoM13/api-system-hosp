import z from 'zod';

import { MIN_LENGTH_PASSWORD } from '@shared/utils';

export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, MIN_LENGTH_PASSWORD),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type AuthenticationType = z.infer<typeof authenticationSchema>;
export type ForgetPasswordType = z.infer<typeof forgotPasswordSchema>;
