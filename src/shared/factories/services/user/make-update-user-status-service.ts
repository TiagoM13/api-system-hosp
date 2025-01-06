import { UpdateUserStatusService } from '@modules/users/useCases/update-user-status/update-user-status-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeUpdateUserStatusService = (): UpdateUserStatusService => {
  return new UpdateUserStatusService(makePrismaUserRepository());
};
