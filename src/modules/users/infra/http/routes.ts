import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import { Role } from '@shared/enums';
import {
  makeChangePasswordUserController,
  makeCreateUserController,
  makeDeleteUserController,
  makeGetAllUsersController,
  makeGetUserController,
  makeUpdateUserController,
} from '@shared/factories/controllers';
import { makeUserRepository } from '@shared/factories/repositories';

const userRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));

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
  app.delete(
    '/users/:id',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    bindController(makeDeleteUserController()),
  );
};

export { userRoutes };
