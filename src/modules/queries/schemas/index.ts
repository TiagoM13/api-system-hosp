import z from "zod";
import { QueryType } from "../../../shared/entities/query";

export const schemaParams = z.object({
    patientId: z.string().uuid(),
});

export const schemaParamsQueries = z.object({
    patientId: z.string().uuid(),
    queryId: z.coerce.number().int()
});

export const schemaBody = z.object({
    type_query: z.nativeEnum(QueryType),
    exam: z.string().min(3).max(255).optional(),
    diagnosis: z.string().min(3).max(255).optional(),
})

export const schemaQuery = z.object({
    page: z.string().transform(val => parseInt(val, 10)).default('1'),
    items_per_page: z.string().transform(val => parseInt(val, 10)).default('10'),
    type_query: z.string().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional()
});