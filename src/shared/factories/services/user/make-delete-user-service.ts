import { DeleteUserService } from '@modules/users/useCases/delete-user/delete-user-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeDeleteUserService = (): DeleteUserService => {
  return new DeleteUserService(makePrismaUserRepository());
};
