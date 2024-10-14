import { GetAllUsersService } from '@modules/users/useCases/gell-all-users/get-all-users-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeGetAllUsersService = (): GetAllUsersService => {
  return new GetAllUsersService(makeUserRepository());
};
