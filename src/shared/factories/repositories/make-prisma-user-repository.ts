import { PrismaUserRepository } from '@modules/users/infra/prisma/prisma-user-repository';
import { UserRepository } from '@modules/users/repositories/user-repository';

export const makePrismaUserRepository = (): UserRepository => {
  return new PrismaUserRepository();
};
