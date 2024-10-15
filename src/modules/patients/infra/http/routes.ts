import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeGetAllPatientsController,
  makeGetPatientController,
  makeUpdatePatientController,
  makeCreatePatientController,
} from '@shared/factories/controllers';
import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

export const patientRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));

  app.post(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeCreatePatientController()),
  );
  app.get(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAllPatientsController()),
  );
  app.get(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetPatientController()),
  );
  app.put(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeUpdatePatientController()),
  );
};
