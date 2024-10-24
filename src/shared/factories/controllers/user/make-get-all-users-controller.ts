import { GetAllUsersController } from '@modules/users/useCases/gell-all-users/get-all-users-controller';
import { makeGetAllUsersService } from '@shared/factories/services/user/make-get-all-users-service';

export const makeGetAllUsersController = (): GetAllUsersController => {
  return new GetAllUsersController(makeGetAllUsersService());
};
