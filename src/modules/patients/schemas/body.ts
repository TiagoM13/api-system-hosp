import { z } from 'zod';

import { Sex, MaterialStatus } from '@shared/enums';
import {
  NAME_FIELD_REQUIRED,
  calculateAge,
  OPTIONAL_STRING_FIELD,
  REQUIRED_FIELD,
  INVALID_DATE_FIELD,
  MIN_DATE_FIELD,
  MAX_DATE_FIELD,
  MIN_LENGTH_CPF,
  MIN_LENGTH_CNS,
  MAX_LENGTH_FIELD_PHONE,
  POSITIVE_NUMBER,
} from '@shared/utils';

export const patientDataSchema = z.object({
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
    .refine(data => data <= new Date(), {
      message: MIN_DATE_FIELD,
    })
    .refine(data => calculateAge(data) <= 105, {
      message: MAX_DATE_FIELD,
    }),
  sex: z.nativeEnum(Sex),
  cpf: OPTIONAL_STRING_FIELD.refine(value => !value || value.length === 11, {
    message: MIN_LENGTH_CPF,
  }),
  cns: OPTIONAL_STRING_FIELD.refine(value => !value || value.length === 15, {
    message: MIN_LENGTH_CNS,
  }),
  address: OPTIONAL_STRING_FIELD,
  mother_name: OPTIONAL_STRING_FIELD,
  father_name: OPTIONAL_STRING_FIELD,
  material_status: z.nativeEnum(MaterialStatus).nullable().optional(),
  occupation: OPTIONAL_STRING_FIELD,
  email: OPTIONAL_STRING_FIELD,
  phone: OPTIONAL_STRING_FIELD.refine(value => !value || value.length === 11, {
    message: MAX_LENGTH_FIELD_PHONE,
  }),
  contact_emergency: OPTIONAL_STRING_FIELD.refine(
    value => !value || value.length === 11,
    {
      message: MAX_LENGTH_FIELD_PHONE,
    },
  ),
  name_contact_emergency: OPTIONAL_STRING_FIELD,
  health_agent: OPTIONAL_STRING_FIELD,
  height: z
    .number()
    .positive({ message: POSITIVE_NUMBER })
    .min(50, { message: 'Altura mínima permitida é 50 cm' })
    .max(300, { message: 'Altura máxima permitida é 300 cm' })
    .nullable()
    .optional(),
  weight: z
    .number()
    .positive({ message: POSITIVE_NUMBER })
    .min(0.5, { message: 'Peso mínimo permitido é 0.5 kg' })
    .max(500, { message: 'Peso máximo permitido é 500 kg' })
    .nullable()
    .optional(),
});

export type PatientDataType = z.infer<typeof patientDataSchema>;
