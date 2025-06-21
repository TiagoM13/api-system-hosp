import { Role } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema, UserSchemaResponse } from './user-doc';

export const updateUserSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Atualiza os dados de um usuário pelo ID.',
  summary: 'Atualizar usuário',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string', enum: Object.values(Role) },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Usuário atualizado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        user: {
          type: 'object',
          properties: UserSchemaResponse,
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: UserNotFoundSchema,
  },
};
