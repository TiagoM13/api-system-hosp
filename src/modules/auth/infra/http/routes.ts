import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import {
  makeForgotPasswordController,
  makeLoginController,
} from '@shared/factories/controllers';

const authRoutes = async (app: FastifyInstance) => {
  app.post('/auth/sign-in', bindController(makeLoginController()));
  app.post(
    '/auth/forgot-password',
    bindController(makeForgotPasswordController()),
  );
};

export { authRoutes };
