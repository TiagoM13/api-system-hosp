import { AppointmentStatus } from '@prisma/client';
import z from 'zod';

export const updateAppointmentStatusSchema = z
  .object({
    status: z.nativeEnum(AppointmentStatus),
  })
  .strict();

export type UpdateAppointmentStatusDTO = z.infer<
  typeof updateAppointmentStatusSchema
>;
