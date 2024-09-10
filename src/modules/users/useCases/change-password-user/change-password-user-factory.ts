import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { ChangePasswordUserController } from './change-password-user-controller';
import { ChangePasswordUserService } from './change-password-user-service';

export function changePasswordUserFactory() {
  const service = new ChangePasswordUserService(makeUserRepository());
  const controller = new ChangePasswordUserController(service);

  return controller;
}

export default changePasswordUserFactory;
