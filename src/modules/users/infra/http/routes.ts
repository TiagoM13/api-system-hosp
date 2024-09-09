import { FastifyInstance } from 'fastify';

import { verifyAuthorization } from '@app/infra/http/middleware/authenticate';
import { updateLastAccess } from '@app/infra/http/middleware/update-last-access';
import { Role } from '@shared/enums/role';
import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import {
  createUserFactory,
  deleteUserFactory,
  getAllUsersFactory,
  getUserFactory,
  updateUserFactory,
  changePasswordUserFactory,
} from '../../useCases';

const userRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));

  app.get(
    '/users',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    (req, res) => getAllUsersFactory().handle(req, res),
  );
  app.get(
    '/users/:userId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => getUserFactory().handle(req, res),
  );
  app.post(
    '/users',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    (req, res) => createUserFactory().handle(req, res),
  );
  app.put(
    '/users/:userId',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => updateUserFactory().handle(req, res),
  );
  app.patch(
    '/users/:userId/change-password',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
    },
    (req, res) => changePasswordUserFactory().handle(req, res),
  );
  app.delete(
    '/users/:userId',
    { preHandler: verifyAuthorization([Role.ADMIN]) },
    (req, res) => deleteUserFactory().handle(req, res),
  );
};

export { userRoutes };
