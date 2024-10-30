import z from 'zod';

import { MIN_LENGTH_PASSWORD } from '@shared/utils';

export const authenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, MIN_LENGTH_PASSWORD),
});

export type AuthenticationDTO = z.infer<typeof authenticationSchema>;
