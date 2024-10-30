import z from 'zod';

import { WORKING_DAY_MIN, WORKING_DAY_MAX } from '@shared/constants/messages';
import { Sex } from '@shared/enums';
import {
  INVALID_DATE_FIELD,
  REQUIRED_FIELD,
  MIN_DATE_FIELD,
  calculateAge,
  MAX_DATE_FIELD,
  NAME_FIELD_REQUIRED,
  OPTIONAL_STRING_FIELD,
  MAX_LENGTH_FIELD_PHONE,
  MIN_LENGTH_TEXT,
  MAX_LENGTH_TEXT,
  MIN_LENGTH_CNS,
} from '@shared/utils';

export const updateDoctorSchema = z
  .object({
    name: NAME_FIELD_REQUIRED,
    birth_date: z
      .preprocess(
        arg => {
          if (typeof arg === 'string') {
            const parsedDate = new Date(arg);
            return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
          }
          return arg;
        },
        z.date({
          invalid_type_error: INVALID_DATE_FIELD,
          required_error: REQUIRED_FIELD,
        }),
      )
      .refine(data => data <= new Date(), MIN_DATE_FIELD)
      .refine(data => calculateAge(data) <= 105, MAX_DATE_FIELD),
    sex: z.nativeEnum(Sex),
    crm: z.string().min(3, MIN_LENGTH_TEXT),
    email: OPTIONAL_STRING_FIELD,
    phone: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 11,
      MAX_LENGTH_FIELD_PHONE,
    ),
    cbo: OPTIONAL_STRING_FIELD,
    cns: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 15,
      MIN_LENGTH_CNS,
    ),
    avatar_url: z.string().nullable().optional(),
    specialty: z
      .string()
      .min(3, MIN_LENGTH_TEXT)
      .max(255, MAX_LENGTH_TEXT)
      .trim(),
    working_days: z.array(
      z.number().int().min(0, WORKING_DAY_MIN).max(6, WORKING_DAY_MAX),
    ),
  })
  .partial()
  .strict();

export type UpdateDoctorDTO = z.infer<typeof updateDoctorSchema>;
