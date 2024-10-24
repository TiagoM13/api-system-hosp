import { UpdateUserController } from '@modules/users/useCases/update-user/update-user-controller';
import { makeUpdateUserService } from '@shared/factories/services/user/make-update-user-service';

export const makeUpdateUserController = (): UpdateUserController => {
  return new UpdateUserController(makeUpdateUserService());
};
