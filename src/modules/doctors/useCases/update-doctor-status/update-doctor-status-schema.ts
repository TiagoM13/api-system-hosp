import { Status } from '@prisma/client';
import z from 'zod';

export const updateDoctorStatusSchema = z
  .object({
    status: z.nativeEnum(Status),
  })
  .strict();

export type UpdateDoctorStatusDTO = z.infer<typeof updateDoctorStatusSchema>;
