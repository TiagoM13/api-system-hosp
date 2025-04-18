import { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { env } from 'src/env';

import { Tags } from '@shared/utils/tags';

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: 'Sistema de Gerenciamento Hospitalar',
      description: 'API para gerenciamento de pacientes, médicos e consultas.',
      version: '1.0.0',
      contact: {
        name: 'Suporte do Sistema',
        email: 'suporte@hospitalsystem.com',
      },
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    servers: [
      {
        url: 'http://localhost:6006',
        description: 'Ambiente de Desenvolvimento',
      },
      {
        url: env.BASE_URL_WEB || 'https://api.hospitalsystem.com',
        description: 'Produção',
      },
    ],
    tags: [
      { name: Tags.AUTH, description: 'Autenticação' },
      { name: Tags.USERS, description: 'Gestão de usuários' },
      { name: Tags.PATIENTS, description: 'Gestão de pacientes' },
      { name: Tags.DOCTORS, description: 'Gestão de médicos' },
      { name: Tags.APPOINTMENTS, description: 'Gerenciamento de consultas' },
    ],
  },
};

export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true,
  },
};
