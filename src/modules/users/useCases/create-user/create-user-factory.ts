import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { CreateUserController } from './create-user-controller';
import { CreateUserService } from './create-user-service';

export function createUserFactory() {
  const service = new CreateUserService(makeUserRepository());
  const controller = new CreateUserController(service);

  return controller;
}

export default createUserFactory;
