import { z } from 'zod';

import { Sex, MaterialStatus } from '@shared/enums';
import {
  FieldTextRequired,
  calculateAge,
  OptionalStringField,
  RequiredField,
  InvalidDateField,
  MinDateField,
  MaxDateField,
  MinLengthCPF,
  MinLengthCNS,
  MaxLengthFieldPhone,
} from '@shared/utils';

export const patientDataSchema = z.object({
  name: FieldTextRequired,
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
        invalid_type_error: InvalidDateField,
        required_error: RequiredField,
      }),
    )
    .refine(data => data <= new Date(), {
      message: MinDateField,
    })
    .refine(data => calculateAge(data) <= 105, {
      message: MaxDateField,
    }),
  sex: z.nativeEnum(Sex),
  cpf: OptionalStringField.refine(value => !value || value.length === 11, {
    message: MinLengthCPF,
  }),
  cns: OptionalStringField.refine(value => !value || value.length === 15, {
    message: MinLengthCNS,
  }),
  address: OptionalStringField,
  mother_name: OptionalStringField,
  father_name: OptionalStringField,
  material_status: z.nativeEnum(MaterialStatus).optional(),
  occupation: OptionalStringField,
  email: OptionalStringField,
  phone: OptionalStringField.refine(value => !value || value.length === 11, {
    message: MaxLengthFieldPhone,
  }),
  contact_emergency: OptionalStringField.refine(
    value => !value || value.length === 11,
    {
      message: MaxLengthFieldPhone,
    },
  ),
  name_contact_emergency: OptionalStringField,
  health_agent: OptionalStringField,
});

export type PatientDataType = z.infer<typeof patientDataSchema>;
