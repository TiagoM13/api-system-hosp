import { FastifyInstance } from 'fastify';

import { bindController } from '@app/infra/http/controller/bindController';
import { passwordRecoverySchemaDoc } from '@modules/auth/docs/forgot-password';
import { loginSchemaDoc } from '@modules/auth/docs/login';
import {
  makeForgotPasswordController,
  makeLoginController,
} from '@shared/factories/controllers';

const authRoutes = async (app: FastifyInstance) => {
  app.post(
    '/auth/sign-in',
    { schema: loginSchemaDoc },
    bindController(makeLoginController()),
  );
  app.post(
    '/auth/forgot-password',
    { schema: passwordRecoverySchemaDoc },
    bindController(makeForgotPasswordController()),
  );
};

export { authRoutes };
