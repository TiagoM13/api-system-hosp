import { MaritalStatus, Sex } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { PatientSchemaResponse } from './patient-doc';

export const createPatientSchemaDoc = {
  tags: [Tags.PATIENTS],
  description: 'Cria um novo paciente',
  summary: 'Criar paciente',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      birth_date: { type: 'string', format: 'date' },
      sex: { type: 'string', enum: Object.values(Sex) },
      cpf: { type: 'string', minLength: 11, maxLength: 11 },
      cns: { type: 'string', minLength: 15, maxLength: 15 },
      address: { type: 'string' },
      mother_name: { type: 'string' },
      father_name: { type: 'string' },
      marital_status: {
        type: ['string', 'null'],
        enum: [...Object.values(MaritalStatus), null],
      },
      occupation: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string', minLength: 11, maxLength: 11 },
      contact_emergency: { type: 'string', minLength: 11, maxLength: 11 },
      name_contact_emergency: { type: 'string' },
      health_agent: { type: 'string' },
      height: {
        type: ['number', 'null'],
        minimum: 50,
        maximum: 300,
      },
      weight: {
        type: ['number', 'null'],
        minimum: 0.5,
        maximum: 500,
      },
    },
    required: ['name', 'birth_date', 'sex'],
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Paciente criado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        patient: {
          type: 'object',
          properties: PatientSchemaResponse,
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
  },
};
