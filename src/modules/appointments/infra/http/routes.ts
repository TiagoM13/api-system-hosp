import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeCreateAppointmentController,
  makeGetAllAppointmentsController,
  makeGetAppointmentController,
  makeListAllAppointmentsController,
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
    bindController(makeListAllAppointmentsController()),
  );
  app.get(
    '/patients/:patientId/appointments',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAllAppointmentsController()),
  );
  app.get(
    '/patients/:patientId/appointments/:appointmentId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetAppointmentController()),
  );
  app.post(
    '/patients/:patientId/appointments',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeCreateAppointmentController()),
  );
  app.put(
    '/patients/:patientId/appointments/:appointmentId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.CLINICAL]),
    },
    bindController(makeUpdateAppointmentController()),
  );
  app.put(
    '/patients/:patientId/appointments/:appointmentId/status',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.CLINICAL]),
    },
    bindController(makeUpdateAppointmentStatusController()),
  );
};
