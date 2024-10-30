import z from 'zod';

import { Sex, MaterialStatus } from '@shared/enums';
import {
  calculateAge,
  NAME_FIELD_REQUIRED,
  INVALID_DATE_FIELD,
  REQUIRED_FIELD,
  MIN_DATE_FIELD,
  MAX_DATE_FIELD,
  OPTIONAL_STRING_FIELD,
  MIN_LENGTH_CPF,
  MIN_LENGTH_CNS,
  MAX_LENGTH_FIELD_PHONE,
  POSITIVE_NUMBER,
  MAX_HEIGHT,
  MAX_WEIGHT,
  MIN_HEIGHT,
  MIN_WEIGHT,
} from '@shared/utils';

export const createPatientSchema = z
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
    cpf: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 11,
      MIN_LENGTH_CPF,
    ),
    cns: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 15,
      MIN_LENGTH_CNS,
    ),
    address: OPTIONAL_STRING_FIELD,
    mother_name: OPTIONAL_STRING_FIELD,
    father_name: OPTIONAL_STRING_FIELD,
    material_status: z.nativeEnum(MaterialStatus).nullable().optional(),
    occupation: OPTIONAL_STRING_FIELD,
    email: OPTIONAL_STRING_FIELD,
    phone: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 11,
      MAX_LENGTH_FIELD_PHONE,
    ),
    contact_emergency: OPTIONAL_STRING_FIELD.refine(
      value => !value || value.length === 11,
      MAX_LENGTH_FIELD_PHONE,
    ),
    name_contact_emergency: OPTIONAL_STRING_FIELD,
    health_agent: OPTIONAL_STRING_FIELD,
    height: z
      .number()
      .positive(POSITIVE_NUMBER)
      .min(50, MIN_HEIGHT)
      .max(300, MAX_HEIGHT)
      .nullable()
      .optional(),
    weight: z
      .number()
      .positive(POSITIVE_NUMBER)
      .min(0.5, MIN_WEIGHT)
      .max(500, MAX_WEIGHT)
      .nullable()
      .optional(),
  })
  .strict();

export type CreatePatientDTO = z.infer<typeof createPatientSchema>;
