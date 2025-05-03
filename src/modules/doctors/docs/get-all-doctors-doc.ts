import { Status } from '@prisma/client';

import {
  metaSchema,
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { DoctorSchemaResponse } from './doctor-doc';

export const getAllDoctorsSchemaDoc = {
  tags: [Tags.DOCTORS],
  summary: 'Listar todos os médicos',
  description: 'Retorna uma lista de médicos cadastrados com paginação',
  security: [{ Bearer: [] }],
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Filtrar por nome do médico' },
      specialty: { type: 'string', description: 'Filtrar por especialidade' },
      status: {
        type: 'string',
        enum: Object.values(Status),
        description: 'Filtrar por status',
      },
      page: { type: 'string', description: 'Número da página' },
      items_per_page: { type: 'string', description: 'Itens por página' },
    },
  },
  response: {
    200: {
      description: 'Lista de médicos retornada com sucesso',
      type: 'object',
      properties: {
        meta: metaSchema,
        doctors: {
          type: 'array',
          items: { type: 'object', properties: DoctorSchemaResponse },
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    // 404: NotFoundSchema,
  },
};
