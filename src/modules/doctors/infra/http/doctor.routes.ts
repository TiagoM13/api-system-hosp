import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import {
  makeCreateDoctorController,
  makeDeleteDoctorController,
  makeGetAllDoctorsController,
  makeGetDoctorController,
  makeUpdateDoctorController,
  makeUpdateDoctorStatusController,
} from '@shared/factories/controllers';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const doctorRoutes = async (app: FastifyInstance) => {
  app.addHook(
    'preHandler',
    verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
  );
  app.addHook('preHandler', updateLastAccess(makePrismaUserRepository()));

  app.get('/doctors', bindController(makeGetAllDoctorsController()));
  app.get('/doctors/:id', bindController(makeGetDoctorController()));
  app.post('/doctors', bindController(makeCreateDoctorController()));
  app.put('/doctors/:id', bindController(makeUpdateDoctorController()));
  app.delete('/doctors/:id', bindController(makeDeleteDoctorController()));
  app.patch(
    '/doctors/:id/status',
    bindController(makeUpdateDoctorStatusController()),
  );
};
