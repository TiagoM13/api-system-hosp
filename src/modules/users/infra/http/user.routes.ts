import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import {
  makeChangePasswordUserController,
  makeCreateUserController,
  makeDeleteUserController,
  makeGetAllUsersController,
  makeGetUserController,
  makeUpdateUserController,
  makeUpdateUserStatusController,
} from '@shared/factories/controllers';
import { makePrismaUserRepository } from '@shared/factories/repositories';

const userRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makePrismaUserRepository()));

  app.get(
    '/users',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    bindController(makeGetAllUsersController()),
  );
  app.get(
    '/users/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeGetUserController()),
  );
  app.post(
    '/users',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    bindController(makeCreateUserController()),
  );
  app.put(
    '/users/:id',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeUpdateUserController()),
  );
  app.patch(
    '/users/:id/change-password',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    bindController(makeChangePasswordUserController()),
  );
  app.patch(
    '/users/:id/status',
    {
      preHandler: verifyAuthorization([Role.ADMIN]),
    },
    bindController(makeUpdateUserStatusController()),
  );
  app.delete(
    '/users/:id',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    bindController(makeDeleteUserController()),
  );
};

export { userRoutes };
