import z from "zod";
import { Role } from "@shared/entities/user";
import { Status } from "@shared/enums/status";

export const schemaParams = z.object({ userId: z.coerce.number().int() });

export const schemaBody = z.object({
  name: z.string().min(3).max(255).trim(),
  email: z.string().email().trim(),
  role: z.nativeEnum(Role),
  status: z.nativeEnum(Status).optional(),
  image_url: z.string().nullable().optional()
})

export const schemaChangePasswordBody = z.object({
  password: z.string().min(6).max(20).trim(),
  confirm_password: z.string().min(6).max(20).trim(),
})

export const schemaQuery = z.object({
  name: z.string().optional(),
  page: z.string().transform((val) => parseInt(val, 10)).default("1"),
  items_per_page: z.string().transform((val) => parseInt(val, 10)).default("10"),
});
