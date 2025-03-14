import { UserSchemaResponse } from '@modules/users/docs/schemas';
import { USER_INACTIVE } from '@shared/constants/messages';
import { InvalidRequestSchema } from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

export const loginSchemaDoc = {
  tags: [Tags.AUTH],
  description: 'Autenticação do usuário',
  summary: 'Autenticar usuário',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de e-mail associado à conta do usuário.',
        default: 'usuario@example.com',
      },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
    additionalProperties: false,
  },
  response: {
    201: {
      description: 'Usuário autenticado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean', default: 'true' },
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: UserSchemaResponse,
        },
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
  },
};
