import { UserRepository } from '@shared/repositories/implementations';

import { DeleteUserController } from './delete-user-controller';
import { DeleteUserService } from './delete-user-service';

export function deleteUserFactory() {
  const repository = new UserRepository();
  const service = new DeleteUserService(repository);
  const controller = new DeleteUserController(service);

  return controller;
}

export default deleteUserFactory;
