import { GetUserService } from '@modules/users/useCases/get-user/get-user-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeGetUserService = (): GetUserService => {
  return new GetUserService(makeUserRepository());
};
