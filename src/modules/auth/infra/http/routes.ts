import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import { updateLastAccess } from '@app/infra/http/middleware';
import {
  makeForgotPasswordController,
  makeLoginController,
} from '@shared/factories/controllers';
import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

const authRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', updateLastAccess(makeUserRepository()));

  app.post('/auth/sign-in', bindController(makeLoginController()));
  app.post(
    '/auth/forgot-password',
    bindController(makeForgotPasswordController()),
  );
};

export { authRoutes };
