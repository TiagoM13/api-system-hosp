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

export const schemaQuery = z
  .object({
    page: z
      .string()
      .transform(val => parseInt(val, 10))
      .default('1'),
    items_per_page: z
      .string()
      .transform(val => parseInt(val, 10))
      .default('10'),
    appointment_type: z.string().optional(),
    start_date: z.preprocess(
      val => (typeof val === 'string' ? new Date(val) : val),
      z.date().optional(),
    ),
    end_date: z.preprocess(
      val => (typeof val === 'string' ? new Date(val) : val),
      z.date().optional(),
    ),
  })
  .refine(
    data => {
      if (data.start_date && data.end_date) {
        return data.start_date <= data.end_date;
      }
      return true;
    },
    {
      message: 'A data de início não pode ser maior que a data de fim',
      path: ['start_date'],
    },
  )
  .refine(
    data => {
      if (data.start_date && data.end_date) {
        return data.end_date >= data.start_date;
      }
      return true;
    },
    {
      message: 'A data de fim não pode ser menor que a data de início',
      path: ['end_date'],
    },
  );

export type AppointmentDataType = z.infer<typeof appointmentDataSchema>;
