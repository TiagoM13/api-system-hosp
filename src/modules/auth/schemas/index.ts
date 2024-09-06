import z from "zod";

export const schemaBodyLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const schemaBodyForgotPassword = z.object({
  email: z.string().email(),
})
