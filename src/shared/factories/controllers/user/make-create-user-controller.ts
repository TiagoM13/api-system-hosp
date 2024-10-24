import { CreateUserController } from '@modules/users/useCases/create-user/create-user-controller';
import { makeCreateUserService } from '@shared/factories/services/user/make-create-user-service';

export const makeCreateUserController = (): CreateUserController => {
  return new CreateUserController(makeCreateUserService());
};
