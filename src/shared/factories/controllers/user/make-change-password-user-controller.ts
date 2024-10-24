import { ChangePasswordUserController } from '@modules/users/useCases/change-password-user/change-password-user-controller';
import { makeChangePasswordUserService } from '@shared/factories/services/user/make-change-password-user-service';

export const makeChangePasswordUserController =
  (): ChangePasswordUserController => {
    return new ChangePasswordUserController(makeChangePasswordUserService());
  };
