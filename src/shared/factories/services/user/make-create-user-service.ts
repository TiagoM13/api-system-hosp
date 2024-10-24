import { CreateUserService } from '@modules/users/useCases/create-user/create-user-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeCreateUserService = (): CreateUserService => {
  return new CreateUserService(makeUserRepository());
};
