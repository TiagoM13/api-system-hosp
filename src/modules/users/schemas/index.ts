import z from "zod";
import { Status, UserType } from "../../../shared/entities/user";

export const schemaParams = z.object({ userId: z.coerce.number().int() });

export const schemaBody = z.object({
    name: z.string().min(3).max(255).trim(),
    email: z.string().email().trim(),
    user_type: z.nativeEnum(UserType),
    status: z.nativeEnum(Status).optional(),
    image_url: z.string().nullable().optional()
})

export const schemaChangePasswordBody = z.object({
    password: z.string().min(6).max(20).trim(),
    confirmPassword: z.string().min(6).max(20).trim(),
})

export const schemaQuery = z.object({
    name: z.string().optional(),
    page: z.string().transform((val) => parseInt(val, 10)).default("1"),
    limit: z.string().transform((val) => parseInt(val, 10)).default("10"),
});