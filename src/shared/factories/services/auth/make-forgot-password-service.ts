import { ForgotPasswordService } from '@modules/auth/useCases/forgot-password/forgot-password-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeForgotPasswordService = (): ForgotPasswordService => {
  return new ForgotPasswordService(makePrismaUserRepository());
};
