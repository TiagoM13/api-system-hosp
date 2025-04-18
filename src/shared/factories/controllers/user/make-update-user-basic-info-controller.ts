import { UpdateUserBasicInfoController } from '@modules/users/useCases/update-user-basic-info/update-user-basic-info-controller';
import { makeUpdateUserBasicInfoService } from '@shared/factories/services/user/make-update-user-basic-info-service';

export const makeUpdateUserBasicInfoController =
  (): UpdateUserBasicInfoController => {
    return new UpdateUserBasicInfoController(makeUpdateUserBasicInfoService());
  };
