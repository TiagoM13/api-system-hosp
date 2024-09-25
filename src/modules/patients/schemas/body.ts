import { z } from 'zod';

import { Sex, MaterialStatus } from '@shared/enums';
import {
  NameFieldRequired,
  calculateAge,
  OptionalStringField,
  RequiredField,
  InvalidDateField,
  MinDateField,
  MaxDateField,
  MinLengthCPF,
  MinLengthCNS,
  MaxLengthFieldPhone,
  PositiveNumber,
} from '@shared/utils';

const Condition = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Condition name is required' }),
});

export const patientDataSchema = z.object({
  id: z.string().uuid().optional(),
  name: NameFieldRequired,
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
  height: z
    .number()
    .positive({ message: PositiveNumber })
    .min(50, { message: 'Altura mínima permitida é 50 cm' })
    .max(300, { message: 'Altura máxima permitida é 300 cm' })
    .optional(),
  weight: z
    .number()
    .positive({ message: PositiveNumber })
    .min(0.5, { message: 'Peso mínimo permitido é 0.5 kg' })
    .max(500, { message: 'Peso máximo permitido é 500 kg' })
    .optional(),
  conditions: z.array(Condition).optional(),
});

export type PatientDataType = z.infer<typeof patientDataSchema>;
