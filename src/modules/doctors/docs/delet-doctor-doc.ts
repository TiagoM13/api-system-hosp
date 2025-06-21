import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

export const deleteDoctorSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Excluir médico',
  description: 'Exclui um médico do sistema pelo ID',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  response: {
    204: {
      description: 'Médico excluído com sucesso',
      type: 'null',
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    // 404: NotFoundSchema,
  },
};
