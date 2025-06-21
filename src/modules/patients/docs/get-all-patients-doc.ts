import { MaritalStatus, Sex, Status } from '@prisma/client';

import {
  InvalidRequestSchema,
  metaSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { PatientSchemaResponse } from './patient-doc';

export const patientListQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      description: 'Filtrar por nome do paciente',
    },
    status: {
      type: 'string',
      enum: Object.values(Status),
      description: 'Filtrar por status do paciente',
    },
    sex: {
      type: 'string',
      enum: Object.values(Sex),
      description: 'Filtrar por sexo do paciente',
    },
    marital_status: {
      type: 'string',
      enum: Object.values(MaritalStatus),
      description: 'Filtrar por estado civil do paciente',
    },
    page: {
      type: 'string',
      description: 'Número da página',
    },
    items_per_page: {
      type: 'string',
      description: 'Número de itens por página',
    },
  },
};

export const getAllPatientsSchemaDoc = {
  tags: [Tags.PATIENTS],
  description:
    'Retorna uma lista de todos os pacientes com filtros e paginação',
  summary: 'Obter todos os pacientes',
  security: [{ Bearer: [] }],
  querystring: patientListQuerySchema,
  response: {
    200: {
      description: 'Lista de pacientes retornada com sucesso',
      type: 'object',
      properties: {
        meta: metaSchema,
        patients: {
          type: 'array',
          items: {
            type: 'object',
            properties: PatientSchemaResponse,
          },
        },
      },
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
  },
};
