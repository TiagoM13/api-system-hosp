import { DeleteUserService } from '@modules/users/useCases/delete-user/delete-user-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeDeleteUserService = (): DeleteUserService => {
  return new DeleteUserService(makeUserRepository());
};
