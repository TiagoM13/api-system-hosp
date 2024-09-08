import { UserRepository } from '@shared/repositories/implementations';

import { UpdateUserController } from './update-user-controller';
import { UpdateUserService } from './update-user-service';

export function updateUserFactory() {
  const repository = new UserRepository();
  const service = new UpdateUserService(repository);
  const controller = new UpdateUserController(service);

  return controller;
}

export default updateUserFactory;
