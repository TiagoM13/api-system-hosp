import { UserRepository } from '@shared/repositories/implementations';
import { ChangePasswordUserService } from './change-password-user-service';
import { ChangePasswordUserController } from './change-password-user-controller';

export function changePasswordUserFactory() {
  const repository = new UserRepository();
  const service = new ChangePasswordUserService(repository);
  const controller = new ChangePasswordUserController(service);

  return controller;
}

export default changePasswordUserFactory;
