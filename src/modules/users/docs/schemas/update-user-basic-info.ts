import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema } from './user-doc';

export const updateUserBasicInfoSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Atualiza os dados básicos de um usuário pelo ID.',
  summary: 'Atualizar dados básicos',
  security: [{ Bearer: [] }],
  body: {
    type: 'object',
    properties: {
      password: { type: 'string' },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      description: 'Dados do usuário atualizado com sucesso',
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
