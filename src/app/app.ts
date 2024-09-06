import { fastify } from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { resolve } from 'node:path';
import multipart from '@fastify/multipart';
import fastifyBcrypt from 'fastify-bcrypt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

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
app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || 'some-secret',
  parseOptions: {},
});

app.register(authRoutes);
app.register(userRoutes);
app.register(routesPatients);
app.register(routesQueries);
app.register(routeUpload);
