import { UserRepository } from '@shared/repositories/implementations';
import { IUserRepository } from '@shared/repositories/interfaces/user';

export const makeUserRepository = (): IUserRepository => {
  return new UserRepository();
};
