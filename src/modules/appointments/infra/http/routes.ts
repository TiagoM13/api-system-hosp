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
import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

export const appointmentRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));
  app.addHook(
    'preHandler',
    verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
  );

  app.get(
    '/appointments/list-all',
    bindController(makeListAllAppointmentsController()),
  );
  app.get(
    '/patients/:patientId/appointments',
    bindController(makeGetAllAppointmentsController()),
  );
  app.get(
    '/patients/:patientId/appointments/:appointmentId',
    bindController(makeGetAppointmentController()),
  );
  app.post(
    '/patients/:patientId/appointments',
    bindController(makeCreateAppointmentController()),
  );
  app.put(
    '/patients/:patientId/appointments/:appointmentId',
    bindController(makeUpdateAppointmentController()),
  );
  app.put(
    '/patients/:patientId/appointments/:appointmentId/status',
    bindController(makeUpdateAppointmentStatusController()),
  );
};
