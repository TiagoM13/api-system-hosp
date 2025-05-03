import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { createDoctorSchemaDoc } from '@modules/doctors/docs/create-doctor-doc';
import { deleteDoctorSchemaDoc } from '@modules/doctors/docs/delet-doctor-doc';
import { getAllDoctorsSchemaDoc } from '@modules/doctors/docs/get-all-doctors-doc';
import { getDoctorByIdSchemaDoc } from '@modules/doctors/docs/get-doctor-by-id-doc';
import { updateDoctorSchemaDoc } from '@modules/doctors/docs/update-doctor-doc';
import { updateDoctorStatusSchemaDoc } from '@modules/doctors/docs/update-status-doctor-doc';
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

  app.get(
    '/doctors',
    {
      schema: getAllDoctorsSchemaDoc,
    },
    bindController(makeGetAllDoctorsController()),
  );
  app.get(
    '/doctors/:id',
    {
      schema: getDoctorByIdSchemaDoc,
    },
    bindController(makeGetDoctorController()),
  );
  app.post(
    '/doctors',
    {
      schema: createDoctorSchemaDoc,
    },
    bindController(makeCreateDoctorController()),
  );
  app.put(
    '/doctors/:id',
    {
      schema: updateDoctorSchemaDoc,
    },
    bindController(makeUpdateDoctorController()),
  );
  app.delete(
    '/doctors/:id',
    {
      schema: deleteDoctorSchemaDoc,
    },
    bindController(makeDeleteDoctorController()),
  );
  app.patch(
    '/doctors/:id/status',
    {
      schema: updateDoctorStatusSchemaDoc,
    },
    bindController(makeUpdateDoctorStatusController()),
  );
};
