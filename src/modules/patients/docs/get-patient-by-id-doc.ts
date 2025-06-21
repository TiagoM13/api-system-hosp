import {
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
  UUIParamsSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { PatientNotFoundSchema, PatientSchemaResponse } from './patient-doc';

export const getPatientByIdSchemaDoc = {
  tags: [Tags.PATIENTS],
  description: 'Busca um paciente por ID',
  summary: 'Buscar paciente por ID',
  security: [{ Bearer: [] }],
  params: UUIParamsSchema,
  response: {
    200: {
      description: 'Paciente encontrado com sucesso',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        patient: {
          type: 'object',
          properties: PatientSchemaResponse,
        },
      },
    },
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
    404: PatientNotFoundSchema,
  },
};
