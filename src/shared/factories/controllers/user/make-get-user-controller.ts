import { GetUserController } from '@modules/users/useCases/get-user/get-user-controller';
import { makeGetUserService } from '@shared/factories/services/user/make-get-user-service';

export const makeGetUserController = (): GetUserController => {
  return new GetUserController(makeGetUserService());
};
