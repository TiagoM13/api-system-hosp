import { UserRepository } from '@shared/repositories/implementations';

import { ForgotPasswordController } from './forgot-password-controller';
import { ForgotPasswordService } from './forgot-password-service';

export function forgotPasswordFactory() {
  const repository = new UserRepository();
  const service = new ForgotPasswordService(repository);
  const controller = new ForgotPasswordController(service);

  return controller;
}

export default forgotPasswordFactory;
