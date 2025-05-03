import { Sex, Status, MaritalStatus } from '@prisma/client';

import { PATIENT_NOT_FOUND } from '@shared/constants/messages';

export const PatientSchemaResponse = {
  id: { type: 'string', format: 'uuid' },
  name: { type: 'string' },
  birth_date: { type: 'string', format: 'date-time' },
  cpf: { type: ['string', 'null'], nullable: true },
  cns: { type: ['string', 'null'], nullable: true },
  sex: { type: 'string', enum: Object.values(Sex) },
  address: { type: ['string', 'null'], nullable: true },
  mother_name: { type: ['string', 'null'], nullable: true },
  father_name: { type: ['string', 'null'], nullable: true },
  marital_status: {
    type: ['string', 'null'],
    enum: [...Object.values(MaritalStatus), null],
    nullable: true,
  },
  occupation: { type: ['string', 'null'], nullable: true },
  email: { type: ['string', 'null'], nullable: true },
  phone: { type: ['string', 'null'], nullable: true },
  contact_emergency: { type: ['string', 'null'], nullable: true },
  name_contact_emergency: { type: ['string', 'null'], nullable: true },
  health_agent: { type: ['string', 'null'], nullable: true },
  status: { type: 'string', enum: Object.values(Status) },
  height: { type: ['number', 'null'], nullable: true },
  weight: { type: ['number', 'null'], nullable: true },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' },
};

export const PatientNotFoundSchema = {
  description: PATIENT_NOT_FOUND,
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};
