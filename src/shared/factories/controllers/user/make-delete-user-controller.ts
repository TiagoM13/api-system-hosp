import { DeleteUserController } from '@modules/users/useCases/delete-user/delete-user-controller';
import { makeDeleteUserService } from '@shared/factories/services/user/make-delete-user-service';

export const makeDeleteUserController = (): DeleteUserController => {
  return new DeleteUserController(makeDeleteUserService());
};
