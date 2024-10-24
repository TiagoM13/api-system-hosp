import z from 'zod';

import { Sex, Status } from '@shared/enums';

export const doctorDataSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().min(3).max(255),
  birth_date: z.coerce.date(),
  sex: z.nativeEnum(Sex),
  crm: z.string().min(3),
  email: z.string().email().trim().optional(),
  phone: z.string().optional(),
  avatar_url: z.string().url().optional(),
  status: z.nativeEnum(Status).optional(),
  appointment_id: z.string().uuid().optional(),
  specialty: z.string().min(3).max(255),
  working_days: z.array(z.number().int()),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type DoctorDataType = z.infer<typeof doctorDataSchema>;
