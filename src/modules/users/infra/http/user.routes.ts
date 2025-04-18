import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import {
  createUserSchemaDoc,
  deleteUserSchemaDoc,
  getAllUsersSchemaDoc,
  getUserByIdSchemaDoc,
  updateStatusUserSchemaDoc,
  updateUserBasicInfoSchemaDoc,
  updateUserSchemaDoc,
} from '@modules/users/docs/schemas';
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetAllUsersController,
  makeGetUserController,
  makeUpdateUserController,
  makeUpdateUserStatusController,
  makeUpdateUserBasicInfoController,
} from '@shared/factories/controllers';
import { makePrismaUserRepository } from '@shared/factories/repositories';

const userRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makePrismaUserRepository()));

  app.get(
    '/users',
    {
      preHandler: verifyAuthorization([Role.ADMIN]),
      schema: getAllUsersSchemaDoc,
    },
    bindController(makeGetAllUsersController()),
  );
  app.get(
    '/users/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: getUserByIdSchemaDoc,
    },
    bindController(makeGetUserController()),
  );
  app.post(
    '/users',
    {
      preHandler: verifyAuthorization([Role.ADMIN]),
      schema: createUserSchemaDoc,
    },
    bindController(makeCreateUserController()),
  );
  app.put(
    '/users/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: updateUserSchemaDoc,
    },
    bindController(makeUpdateUserController()),
  );
  app.patch(
    '/users/:id/basic-info',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: updateUserBasicInfoSchemaDoc,
    },
    bindController(makeUpdateUserBasicInfoController()),
  );
  app.patch(
    '/users/:id/status',
    {
      preHandler: verifyAuthorization([Role.ADMIN]),
      schema: updateStatusUserSchemaDoc,
    },
    bindController(makeUpdateUserStatusController()),
  );
  app.delete(
    '/users/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN]),
      schema: deleteUserSchemaDoc,
    },
    bindController(makeDeleteUserController()),
  );
};

export { userRoutes };
