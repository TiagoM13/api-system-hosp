import { UpdateUserService } from '@modules/users/useCases/update-user/update-user-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeUpdateUserService = (): UpdateUserService => {
  return new UpdateUserService(makePrismaUserRepository());
};
