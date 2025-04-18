import { AppointmentStatus, AppointmentType } from '@prisma/client';
import z from 'zod';

export const appointmentParamId = z.object({
  patientId: z.string().uuid(),
});

export const appointmentParamsSchema = z.object({
  patientId: z.string().uuid(),
  appointmentId: z.string().uuid(),
});

export const appointmentQuerySchema = z.object({
  name: z.string().optional(),
  appointment_type: z
    .union([z.nativeEnum(AppointmentType), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .optional(),
  status: z
    .union([z.nativeEnum(AppointmentStatus), z.literal('')])
    .transform(val => (val === '' ? undefined : val))
    .optional(),
  scheduled_date: z.preprocess(val => {
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
      return new Date(`${val}T00:00:00.000Z`);
    }
    if (val === '' || val === null || val === undefined) {
      return undefined;
    }
    throw new Error('Data inválida. Use o formato YYYY-MM-DD.');
  }, z.date().optional()),
  page: z.coerce.number().default(1),
  items_per_page: z.coerce.number().max(500).default(10),
});
