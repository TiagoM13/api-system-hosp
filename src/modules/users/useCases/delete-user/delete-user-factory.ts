import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { DeleteUserController } from './delete-user-controller';
import { DeleteUserService } from './delete-user-service';

export function deleteUserFactory() {
  const service = new DeleteUserService(makeUserRepository());
  const controller = new DeleteUserController(service);

  return controller;
}

export default deleteUserFactory;
