import z from 'zod';

export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type AuthenticationType = z.infer<typeof authenticationSchema>;
export type ForgetPasswordType = z.infer<typeof forgotPasswordSchema>;
