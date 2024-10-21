import z from 'zod';

import { AppointmentStatus } from '@shared/enums';

export const updateAppointmentStatusSchema = z
  .object({
    status: z.nativeEnum(AppointmentStatus),
  })
  .strict();

export type UpdateAppointmentStatusType = z.infer<
  typeof updateAppointmentStatusSchema
>;
