import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { DoctorSchemaResponse } from './doctor-doc';

export const createDoctorSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Criar novo médico',
  description: 'Cria um novo médico no sistema',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    required: ['name', 'birth_date', 'sex', 'crm', 'specialty', 'working_days'],
    properties: DoctorSchemaResponse,
  },
  response: {
    201: {
      description: 'Médico criado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        doctor: {
          type: 'object',
          properties: DoctorSchemaResponse,
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
  },
};
