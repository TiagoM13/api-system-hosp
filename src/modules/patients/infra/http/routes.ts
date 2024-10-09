import { FastifyInstance } from 'fastify';

import { verifyAuthorization } from '@app/infra/http/middleware';
import {
  createPatientFactory,
  getAllPatientsFactory,
  getPatientFactory,
  updatePatientFactory,
} from '@modules/patients/useCases';
import { Role } from '@shared/enums';

const routesPatients = async (app: FastifyInstance) => {
  app.post(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => createPatientFactory().handle(req, res),
  );
  app.get(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => getAllPatientsFactory().handle(req, res),
  );
  app.get(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => getPatientFactory().handle(req, res),
  );
  app.put(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => updatePatientFactory().handle(req, res),
  );
};

export { routesPatients };
