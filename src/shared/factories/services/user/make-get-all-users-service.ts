import { GetAllUsersService } from '@modules/users/useCases/gell-all-users/get-all-users-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeGetAllUsersService = (): GetAllUsersService => {
  return new GetAllUsersService(makeUserRepository());
};
