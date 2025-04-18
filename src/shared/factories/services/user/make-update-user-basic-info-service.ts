import { UpdateUserBasicInfoService } from '@modules/users/useCases/update-user-basic-info/update-user-basic-info-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeUpdateUserBasicInfoService =
  (): UpdateUserBasicInfoService => {
    return new UpdateUserBasicInfoService(makePrismaUserRepository());
  };
