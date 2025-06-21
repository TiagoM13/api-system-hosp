import {
  TOKEN_NOT_FOUND,
  USER_NOT_AUTHORIZED,
} from '@shared/constants/messages';

export const metaSchema = {
  type: 'object',
  properties: {
    page: { type: 'number', example: 1 },
    total_pages: { type: 'number', example: 2 },
    total_records: { type: 'number', example: 12 },
    total_current_records: { type: 'number', example: 10 },
    items_per_page: { type: 'number', example: 10 },
    has_previous_page: { type: 'boolean', example: false },
    has_next_page: { type: 'boolean', example: true },
  },
  required: [
    'page',
    'total_pages',
    'total_records',
    'total_current_records',
    'items_per_page',
    'has_previous_page',
    'has_next_page',
  ],
};

export const TokenNotFoundSchema = {
  description: TOKEN_NOT_FOUND,
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};
export const InvalidRequestSchema = {
  description: 'Requisição inválida',
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};
export const UserNotAuthorizedSchema = {
  description: USER_NOT_AUTHORIZED,
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};
export const UUIParamsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
  },
  required: ['id'],
};
