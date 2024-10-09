import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  BASE_URL_WEB: z.string().url(),
  JWT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
