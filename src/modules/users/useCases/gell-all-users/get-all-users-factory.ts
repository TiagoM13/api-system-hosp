import { makeUserRepository } from '@shared/factories/repositories/make-user-repository';

import { GetAllUsersController } from './get-all-users-controller';
import { GetAllUsersService } from './get-all-users-service';

export function getAllUsersFactory() {
  const service = new GetAllUsersService(makeUserRepository());
  const controller = new GetAllUsersController(service);

  return controller;
}

export default getAllUsersFactory;
