import { AppointmentType } from '@prisma/client';

export const AppointmentSchemaResponse = {
  id: {
    type: 'string',
    format: 'uuid',
  },
  appointment_type: {
    type: 'string',
    enum: Object.values(AppointmentType),
  },
  scheduled_date: {
    type: 'string',
    format: 'date-time',
  },
  doctor_id: {
    type: 'string',
    format: 'uuid',
  },
  created_at: {
    type: 'string',
    format: 'date-time',
  },
  updated_at: {
    type: 'string',
    format: 'date-time',
  },
};
