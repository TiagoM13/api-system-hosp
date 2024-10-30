import { UpdateUserStatusController } from '@modules/users/useCases/update-user-status/update-user-status-controller';
import { makeUpdateUserStatusService } from '@shared/factories/services/user/make-update-user-status-service';

export const makeUpdateUserStatusController =
  (): UpdateUserStatusController => {
    return new UpdateUserStatusController(makeUpdateUserStatusService());
  };
