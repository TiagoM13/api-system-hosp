import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeCreateDoctorController,
  makeDeleteDoctorController,
  makeGetAllDoctorsController,
  makeGetDoctorController,
  makeUpdateDoctorController,
} from '@shared/factories/controllers';
import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

export const doctorRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));
  app.addHook('preHandler', verifyAuthorization([Role.ADMIN]));

  app.get('/doctors', bindController(makeGetAllDoctorsController()));
  app.get('/doctors/:id', bindController(makeGetDoctorController()));
  app.post('/doctors', bindController(makeCreateDoctorController()));
  app.put('/doctors/:id', bindController(makeUpdateDoctorController()));
  app.delete('/doctors/:id', bindController(makeDeleteDoctorController()));
};
