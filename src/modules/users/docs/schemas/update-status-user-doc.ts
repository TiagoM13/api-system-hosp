import { Status } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema } from './user-doc';

export const updateStatusUserSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Atualiza o status de um usuário (ativo/inativo).',
  summary: 'Atualizar status do usuário',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  body: {
    type: 'object',
    properties: {
      status: { type: 'string', enum: Object.values(Status) },
    },
    required: ['status'],
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Status do usuário atualizado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: UserNotFoundSchema,
  },
};
