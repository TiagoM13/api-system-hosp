import { CreateUserService } from '@modules/users/useCases/create-user/create-user-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeCreateUserService = (): CreateUserService => {
  return new CreateUserService(makePrismaUserRepository());
};
