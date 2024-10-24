import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import { fastifyStatic } from '@fastify/static';
import { fastify } from 'fastify';
import fastifyBcrypt from 'fastify-bcrypt';
import { resolve } from 'node:path';

import {
  patientRoutes,
  appointmentRoutes,
  uploadRoutes,
  userRoutes,
  authRoutes,
  doctorRoutes,
} from '@modules/exports';

import { env } from '../env';
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
  secret: env.JWT_SECRET || 'defaultsecret',
});
app.register(fastifyBcrypt, {
  saltWorkFactor: 12,
});

app.register(authRoutes);
app.register(userRoutes);
app.register(patientRoutes);
app.register(appointmentRoutes);
app.register(uploadRoutes);
app.register(doctorRoutes);
