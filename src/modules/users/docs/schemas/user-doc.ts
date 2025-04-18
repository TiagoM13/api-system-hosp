import { Role } from '@prisma/client';

import { USER_NOT_FOUND } from '@shared/constants/messages';

export const UserSchemaResponse = {
  id: { type: 'string' },
  name: { type: 'string' },
  email: { type: 'string' },
  image_url: { type: 'string', format: 'uri' },
  role: { type: 'string', enum: Object.values(Role) },
  status: { type: 'string' },
  last_access: { type: 'string', format: 'date-time' },
  created_at: { type: 'string', format: 'date-time' },
  updated_at: { type: 'string', format: 'date-time' },
};

export const UserNotFoundSchema = {
  description: USER_NOT_FOUND,
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};
