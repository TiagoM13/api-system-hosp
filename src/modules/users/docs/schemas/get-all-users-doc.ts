import { Role, Status } from '@prisma/client';

import {
  InvalidRequestSchema,
  metaSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema, UserSchemaResponse } from './user-doc';

export const userListQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      description: 'Filtrar por nome do usuário',
    },
    status: {
      type: 'string',
      enum: Object.values(Status),
      description: 'Filtrar por status do usuário',
    },
    role: {
      type: 'string',
      enum: Object.values(Role),
      description: 'Filtrar por role do usuário',
    },
    page: { type: 'number', description: 'Número da página' },
    items_per_page: {
      type: 'number',
      description: 'Número de itens por página',
    },
  },
};

export const getAllUsersSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Retorna uma lista de todos os usuários',
  summary: 'Obter todos os usuários',
  security: [{ Bearer: [] }],
  querystring: userListQuerySchema,
  response: {
    200: {
      description: 'Lista de usuários retornada com sucesso',
      type: 'object',
      properties: {
        meta: metaSchema,
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: UserSchemaResponse,
          },
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: UserNotFoundSchema,
  },
};
