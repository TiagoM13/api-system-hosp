import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeCreateAppointmentController,
  makeGetAppointmentsByPatientController,
  makeGetAppointmentController,
  makeGetAllAppointmentsController,
  makeUpdateAppointmentController,
  makeUpdateAppointmentStatusController,
} from '@shared/factories/controllers';
import { makeUserRepository } from '@shared/factories/repositories';

export const appointmentRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));

  app.get(
    '/appointments',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAllAppointmentsController()),
  );
  app.get(
    '/appointments/:patientId/list',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAppointmentsByPatientController()),
  );
  app.get(
    '/appointments/:patientId/appointment/:appointmentId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAppointmentController()),
  );
  app.post(
    '/appointments/:patientId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeCreateAppointmentController()),
  );
  app.put(
    '/appointments/:patientId/appointment/:appointmentId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.CLINICAL]),
    },
    bindController(makeUpdateAppointmentController()),
  );
  app.patch(
    '/appointments/:patientId/appointment/:appointmentId/status',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.CLINICAL]),
    },
    bindController(makeUpdateAppointmentStatusController()),
  );
};
