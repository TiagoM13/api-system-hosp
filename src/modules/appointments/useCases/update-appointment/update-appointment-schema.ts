import z from 'zod';

import { AppointmentType } from '@shared/enums';
import { MIN_LENGTH_TEXT, MAX_LENGTH_TEXT } from '@shared/utils';

export const updateAppointmentSchema = z
  .object({
    appointment_type: z.nativeEnum(AppointmentType),
    scheduled_date: z.coerce.date(),
    doctor_id: z.number().int(),
    examination: z.string().min(3, MIN_LENGTH_TEXT).max(255, MAX_LENGTH_TEXT),
    diagnosis_summary: z
      .string()
      .min(3, MIN_LENGTH_TEXT)
      .max(255, MAX_LENGTH_TEXT),
  })
  .partial()
  .strict();

export type UpdateAppointmentDTO = z.infer<typeof updateAppointmentSchema>;
