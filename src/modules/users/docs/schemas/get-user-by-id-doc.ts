import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema, UserSchemaResponse } from './user-doc';

export const getUserByIdSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Obtém os detalhes de um usuário pelo ID.',
  summary: 'Obter usuário',
  security: [{ Bearer: [] }],
  response: {
    200: {
      description: 'Usuário obtido com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        messgae: {
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
