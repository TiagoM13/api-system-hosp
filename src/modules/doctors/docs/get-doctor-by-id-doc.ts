import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { DoctorSchemaResponse } from './doctor-doc';

export const getDoctorByIdSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Buscar médico por ID',
  description: 'Retorna os dados de um médico pelo ID',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  response: {
    200: {
      description: 'Médico retornado com sucesso',
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
