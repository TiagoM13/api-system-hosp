import { GetAllUsersService } from '@modules/users/useCases/gell-all-users/get-all-users-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeGetAllUsersService = (): GetAllUsersService => {
  return new GetAllUsersService(makePrismaUserRepository());
};
