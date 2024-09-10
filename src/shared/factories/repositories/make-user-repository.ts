import { UserRepository } from '@shared/repositories/implementations';

export const makeUserRepository = (): UserRepository => {
  return new UserRepository();
};
