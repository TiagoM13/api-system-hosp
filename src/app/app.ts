import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { fastifyMultipart } from '@fastify/multipart';
import { fastifyStatic } from '@fastify/static';
import { fastify } from 'fastify';
import { fastifyBcrypt } from 'fastify-bcrypt';
import cron from 'node-cron';
import { resolve } from 'node:path';

import {
  patientRoutes,
  appointmentRoutes,
  uploadRoutes,
  userRoutes,
  authRoutes,
  doctorRoutes,
} from '@modules/exports';
import { PatientStatusService } from '@modules/patients/useCases/update-patient-status/update-patient-status-service';

import { env } from '../env';
import { errorHandler } from './infra/http/middleware/error-handler';

export const app = fastify({
  logger: true,
});

app.setErrorHandler(errorHandler);

app.register(cors, {
  origin: '*',
});
app.register(fastifyMultipart);
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

// Job deve rodar todos os dias as 21hrs
cron.schedule('0 21 * * *', async () => {
  try {
    app.log.info('Iniciando tarefa de atualização de status de pacientes.');
    await PatientStatusService.execute();
    app.log.info('Tarefa de atualização concluída com sucesso.');
  } catch (error) {
    app.log.error('Erro durante a execução da tarefa:', error);
  }
});
