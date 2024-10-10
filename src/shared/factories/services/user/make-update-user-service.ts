import { UpdateUserService } from '@modules/users/useCases/update-user/update-user-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeUpdateUserService = (): UpdateUserService => {
  return new UpdateUserService(makeUserRepository());
};
