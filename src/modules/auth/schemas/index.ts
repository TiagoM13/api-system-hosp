import z from "zod";

export const schemaBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})