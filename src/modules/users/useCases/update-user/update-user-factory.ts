import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { UpdateUserController } from './update-user-controller';
import { UpdateUserService } from './update-user-service';

export function updateUserFactory() {
  const service = new UpdateUserService(makeUserRepository());
  const controller = new UpdateUserController(service);

  return controller;
}

export default updateUserFactory;
