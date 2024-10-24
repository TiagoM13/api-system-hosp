import { GetUserService } from '@modules/users/useCases/get-user/get-user-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeGetUserService = (): GetUserService => {
  return new GetUserService(makeUserRepository());
};
