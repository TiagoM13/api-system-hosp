import { Status } from '@prisma/client';
import { z } from 'zod';

import { MUST_CONTAIN_CPF_SIZE, MUST_CONTAIN_CNS_SIZE } from '@shared/utils';

export const patientsFilterSchema = z.object({
  name: z.string().optional(),
  page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('1'),
  items_per_page: z
    .string()
    .transform(val => parseInt(val, 10))
    .default('10'),
  cpf: z.string().max(11, MUST_CONTAIN_CPF_SIZE).optional(),
  cns: z.string().max(15, MUST_CONTAIN_CNS_SIZE).optional(),
  status: z.nativeEnum(Status).optional(),
});

export type PatientsFilterType = z.infer<typeof patientsFilterSchema>;
