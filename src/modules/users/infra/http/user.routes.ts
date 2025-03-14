import { Role } from '@prisma/client';
import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  updateLastAccess,
  verifyAuthorization,
} from '@app/infra/http/middleware';
import {
  createUserSchemaDoc,
  getAllUsersSchemaDoc,
  getUserByIdSchemaDoc,
} from '@modules/users/docs/schemas';
import { deleteUserSchemaDoc } from '@modules/users/docs/schemas/delete-user-doc';
import { updateStatusUserSchemaDoc } from '@modules/users/docs/schemas/update-status-user-doc';
import { updateUserSchemaDoc } from '@modules/users/docs/schemas/update-user-doc';
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
    '/users/:id/change-password',
    {
      preHandler: verifyAuthorization([Role.ADMIN, Role.EDITOR, Role.CLINICAL]),
      schema: {
        tags: ['Users'],
        description: 'Altera a senha de um usuário pelo ID.',
      },
    },
    bindController(makeChangePasswordUserController()),
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
