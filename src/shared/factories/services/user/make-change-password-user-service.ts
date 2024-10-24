import { ChangePasswordUserService } from '@modules/users/useCases/change-password-user/change-password-user-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeChangePasswordUserService = (): ChangePasswordUserService => {
  return new ChangePasswordUserService(makeUserRepository());
};
