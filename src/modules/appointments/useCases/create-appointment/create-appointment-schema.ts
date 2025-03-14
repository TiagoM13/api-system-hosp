import { AppointmentType } from '@prisma/client';
import z from 'zod';

export const createAppointmentSchema = z
  .object({
    appointment_type: z.nativeEnum(AppointmentType),
    scheduled_date: z.coerce.date(),
    doctor_id: z.string().uuid(),
  })
  .strict();

export type CreateAppointmentDTO = z.infer<typeof createAppointmentSchema>;
