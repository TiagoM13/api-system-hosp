import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import { verifyAuthorization } from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeGetAllPatientsController,
  makeGetPatientController,
  makeUpdatePatientController,
  makeCreatePatientController,
} from '@shared/factories/controllers';

const routesPatients = async (app: FastifyInstance) => {
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

export { routesPatients };
