import { Sex, Status } from '@prisma/client';

export const DoctorSchemaResponse = {
  id: { type: 'string', format: 'uuid' },
  name: { type: 'string' },
  birth_date: { type: 'string', format: 'date' },
  sex: { type: 'string', enum: Object.values(Sex) },
  crm: { type: 'string' },
  email: { type: ['string', 'null'], nullable: true },
  phone: { type: ['string', 'null'], nullable: true },
  cbo: { type: ['string', 'null'], nullable: true },
  cns: { type: ['string', 'null'], nullable: true },
  avatar_url: { type: ['string', 'null'], nullable: true },
  specialty: { type: 'string' },
  working_days: {
    type: 'array',
    items: { type: 'integer', minimum: 0, maximum: 6 },
  },
  status: { type: 'string', enum: Object.values(Status) },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' },
};
