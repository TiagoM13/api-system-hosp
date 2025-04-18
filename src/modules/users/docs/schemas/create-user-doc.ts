import { Role } from '@prisma/client';

import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema, UserSchemaResponse } from './user-doc';

export const createUserSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Cria um novo usuário',
  summary: 'Criar usuário',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      role: { type: 'string', enum: Object.values(Role) },
    },
    required: ['name', 'email', 'role'],
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Usuário criado com sucesso',
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
