import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { DoctorSchemaResponse } from './doctor-doc';

export const updateDoctorSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Atualizar médico',
  description: 'Atualiza os dados de um médico existente',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  body: {
    type: 'object',
    properties: DoctorSchemaResponse,
  },
  response: {
    200: {
      description: 'Médico atualizado com sucesso',
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
    // 404: NotFoundSchema,
  },
};
