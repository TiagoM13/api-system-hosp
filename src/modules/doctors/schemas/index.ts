import z from 'zod';

import { WORKING_DAY_MIN, WORKING_DAY_MAX } from '@shared/constants/messages';
import { Sex, Status } from '@shared/enums';
import {
  InvalidDateField,
  RequiredField,
  MinDateField,
  calculateAge,
  MaxDateField,
  NameFieldRequired,
  OptionalStringField,
  MaxLengthFieldPhone,
  MinLengthText,
  MaxLengthText,
  MinLengthCNS,
} from '@shared/utils';

export const doctorDataSchema = z.object({
  id: z.number().int().optional(),
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
  crm: z.string().min(3, MinLengthText),
  email: OptionalStringField,
  phone: OptionalStringField.refine(value => !value || value.length === 11, {
    message: MaxLengthFieldPhone,
  }),
  cbo: OptionalStringField,
  cns: OptionalStringField.refine(value => !value || value.length === 15, {
    message: MinLengthCNS,
  }),
  avatar_url: z.string().nullable().optional(),
  status: z.nativeEnum(Status).optional(),
  appointment_id: z.string().uuid().optional(),
  specialty: z.string().min(3, MinLengthText).max(255, MaxLengthText).trim(),
  working_days: z.array(
    z.number().int().min(0, WORKING_DAY_MIN).max(6, WORKING_DAY_MAX),
  ),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type DoctorDataType = z.infer<typeof doctorDataSchema>;
