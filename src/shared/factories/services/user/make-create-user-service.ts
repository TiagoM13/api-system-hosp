import { CreateUserService } from '@modules/users/useCases/create-user/create-user-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeCreateUserService = (): CreateUserService => {
  return new CreateUserService(makeUserRepository());
};
