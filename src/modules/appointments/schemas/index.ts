import z from 'zod';

import { TypeQuery } from '@shared/enums/query';

export const appointmentParamId = z.object({
  patientId: z.string().uuid(),
});

export const appointmentParamsSchema = z.object({
  patientId: z.string().uuid(),
  appointmentId: z.coerce.number().int(),
});

export const appointmentDataSchema = z.object({
  appointment_type: z.nativeEnum(TypeQuery),
  examination: z.string().min(3).max(255).optional(),
  diagnosis_summary: z.string().min(3).max(255).optional(),
  scheduled_date: z.coerce.date(),
});

export const schemaQuery = z.object({
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('1'),
  items_per_page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('10'),
  appointment_type: z.string().optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export type AppointmentDataType = z.infer<typeof appointmentDataSchema>;
