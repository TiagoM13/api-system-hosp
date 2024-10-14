import { ChangePasswordUserService } from '@modules/users/useCases/change-password-user/change-password-user-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeChangePasswordUserService = (): ChangePasswordUserService => {
  return new ChangePasswordUserService(makeUserRepository());
};
