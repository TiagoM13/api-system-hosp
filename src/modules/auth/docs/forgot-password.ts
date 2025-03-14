import { UserNotFoundSchema } from '@modules/users/docs/schemas';
import { USER_INACTIVE } from '@shared/constants/messages';
import { InvalidRequestSchema } from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

export const passwordRecoverySchemaDoc = {
  tags: [Tags.AUTH],
  description: 'Permite a recuperação de senha para usuários registrados.',
  summary: 'Recuperação de senha',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de e-mail associado à conta do usuário.',
        default: 'usuario@example.com',
      },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Senha recuperada com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: 'true' },
        message: { type: 'string' },
      },
    },
    400: InvalidRequestSchema,
    403: {
      description: USER_INACTIVE,
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: UserNotFoundSchema,
  },
};
