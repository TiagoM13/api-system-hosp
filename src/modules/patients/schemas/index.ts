import z from "zod";

export const schemaParams = z.object({ patientId: z.string().uuid() });

export const schemaBody = z.object({
    name: z.string().min(3).max(255),
    birth_date: z.coerce.date(),
    sex: z.coerce.string(),
    // sex: z.enum(["male", "female"]),
    address: z.string().optional(),
    cpf: z.string().min(11).max(11).optional(),
    cnes: z.string().min(15).max(15).optional(),
    mother_name: z.string().optional(),
    father_name: z.string().optional(),
    material_status: z.string().optional(),
    occupation: z.string().optional(),
    // queries: z.string().optional()
})

export const schemaQuery = z.object({
    name: z.string().optional(),
    page: z.string().transform((val) => parseInt(val, 10)).default("1"),
    limit: z.string().transform((val) => parseInt(val, 10)).default("10"),
});