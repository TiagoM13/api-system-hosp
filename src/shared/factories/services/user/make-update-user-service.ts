import { UpdateUserService } from '@modules/users/useCases/update-user/update-user-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeUpdateUserService = (): UpdateUserService => {
  return new UpdateUserService(makeUserRepository());
};
