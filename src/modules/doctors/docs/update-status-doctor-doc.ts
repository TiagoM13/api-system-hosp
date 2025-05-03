import { Status } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

export const updateDoctorStatusSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Atualizar status do médico',
  description:
    'Atualiza o status (ACTIVE ou INACTIVE) de um médico existente pelo ID.',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'string',
        enum: Object.values(Status),
        description: 'Novo status do médico',
      },
    },
  },
  response: {
    200: {
      description: 'Status do médico atualizado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: {
      description: 'Médico não encontrado',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Médico não encontrado',
        },
      },
    },
  },
};
