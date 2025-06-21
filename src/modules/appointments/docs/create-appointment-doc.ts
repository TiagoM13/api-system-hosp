import {
  InvalidRequestSchema,
  TokenNotFoundSchema,
  UserNotAuthorizedSchema,
} from '@shared/utils/swagger-schemas';
import { Tags } from '@shared/utils/tags';

import { AppointmentSchemaResponse } from './appointment-doc';

export const createAppointmentDoc = {
  tags: [Tags.APPOINTMENTS],
  summary: 'Criar um novo agendamento',
  description: 'Cria um novo agendamento para um médico em uma data específica',
  security: [{ Bearer: [] }],
  params: {},
  body: {
    type: 'object',
    required: ['appointment_type', 'scheduled_date', 'doctor_id'],
    properties: AppointmentSchemaResponse,
  },
  response: {
    201: {
      description: 'Agendamento criado com sucesso',
      type: 'object',
      properties: AppointmentSchemaResponse,
    },
    400: InvalidRequestSchema,
    401: TokenNotFoundSchema,
    403: UserNotAuthorizedSchema,
  },
};
