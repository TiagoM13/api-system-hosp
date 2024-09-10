import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { GetUserController } from './get-user-controller';
import { GetUserService } from './get-user-service';

export function getUserFactory() {
  const service = new GetUserService(makeUserRepository());
  const controller = new GetUserController(service);

  return controller;
}

export default getUserFactory;
