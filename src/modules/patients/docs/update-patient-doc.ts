import { MaritalStatus, Sex } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { PatientNotFoundSchema, PatientSchemaResponse } from './patient-doc';

export const updatePatientSchemaDoc = {
  tags: [Tags.PATIENTS],
  description: 'Atualiza um paciente existente',
  summary: 'Atualizar paciente',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
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
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Paciente atualizado com sucesso',
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
    404: PatientNotFoundSchema,
  },
};
