import z from 'zod';

import { Status } from '@shared/enums';

export const updateDoctorStatusSchema = z
  .object({
    status: z.nativeEnum(Status),
  })
  .strict();

export type UpdateDoctorStatusDTO = z.infer<typeof updateDoctorStatusSchema>;
