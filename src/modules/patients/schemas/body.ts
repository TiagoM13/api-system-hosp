import { Sex, MaterialStatus } from '@/src/shared/enums';
import {
  FieldTextRequired,
  calculateAge,
  OptionalStringField,
} from '@/src/shared/utils';
import { z } from 'zod';

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
        invalid_type_error: 'Data inválida, por favor insira uma data válida',
        required_error: 'O campo é obrigatório',
      }),
    )
    .refine(data => data <= new Date(), {
      message: 'A data de nascimento não pode ser futura',
    })
    .refine(data => calculateAge(data) <= 105, {
      message: 'A idade não pode ser maior que 105 anos',
    }),
  sex: z.nativeEnum(Sex),
  cpf: OptionalStringField.refine(value => !value || value.length === 11, {
    message: 'O CPF deve ter no máximo 11 dígitos.',
  }),
  cns: OptionalStringField.refine(value => !value || value.length === 15, {
    message: 'O CNS deve ter no máximo 15 dígitos.',
  }),
  address: OptionalStringField,
  mother_name: OptionalStringField,
  father_name: OptionalStringField,
  material_status: z.nativeEnum(MaterialStatus),
  occupation: OptionalStringField,
  email: OptionalStringField,
  phone: OptionalStringField.refine(value => !value || value.length === 11, {
    message: 'O número de telefone deve ter no máximo 11 dígitos.',
  }),
  contact_emergency: OptionalStringField.refine(
    value => !value || value.length === 11,
    {
      message: 'O número de telefone deve ter no máximo 11 dígitos.',
    },
  ),
  name_contact_emergency: OptionalStringField,
  health_agent: OptionalStringField,
});

export type PatientDataType = z.infer<typeof patientDataSchema>;
