import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { createPatientSchemaDoc } from '@modules/patients/docs/create-patient-doc';
import { getAllPatientsSchemaDoc } from '@modules/patients/docs/get-all-patients-doc';
import { getPatientByIdSchemaDoc } from '@modules/patients/docs/get-patient-by-id-doc';
import { updatePatientSchemaDoc } from '@modules/patients/docs/update-patient-doc';
import {
  makeGetAllPatientsController,
  makeGetPatientController,
  makeUpdatePatientController,
  makeCreatePatientController,
} from '@shared/factories/controllers';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const patientRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makePrismaUserRepository()));

  app.post(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: createPatientSchemaDoc,
    },
    bindController(makeCreatePatientController()),
  );
  app.get(
    '/patients',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: getAllPatientsSchemaDoc,
    },
    bindController(makeGetAllPatientsController()),
  );
  app.get(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: getPatientByIdSchemaDoc,
    },
    bindController(makeGetPatientController()),
  );
  app.put(
    '/patients/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: updatePatientSchemaDoc,
    },
    bindController(makeUpdatePatientController()),
  );
};
