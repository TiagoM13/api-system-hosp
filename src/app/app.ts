import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { fastifyStatic } from '@fastify/static';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';
import { resolve } from 'node:path';

import {
  routesPatients,
  routesQueries,
  routeUpload,
  userRoutes,
  authRoutes,
} from '@modules/exports';

import { errorHandler } from './infra/http/middleware/error-handler';

export const app = fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(cors, {
  origin: '*',
});
app.register(multipart);
app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
});
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'defaultsecret',
});
app.register(fastifyBcrypt, {
  saltWorkFactor: 12,
});

app.register(authRoutes);
app.register(userRoutes);
app.register(routesPatients);
app.register(routesQueries);
app.register(routeUpload);
