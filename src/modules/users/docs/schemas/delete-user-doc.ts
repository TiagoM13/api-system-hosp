import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { UserNotFoundSchema } from './user-doc';

export const deleteUserSchemaDoc = {
  tags: [Tags.USERS],
  description: 'Deleta um usuário do sistema pelo ID.',
  summary: 'Deletar usuário',
  security: [{ Bearer: [] }],
  response: {
    200: {
      description: 'Usuário deletado com sucesso',
      type: 'null',
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: UserNotFoundSchema,
  },
};
