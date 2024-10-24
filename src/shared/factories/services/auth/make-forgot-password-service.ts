import { ForgotPasswordService } from '@modules/auth/useCases/forgot-password/forgot-password-service';
import { makeUserRepository } from '@shared/factories/repositories';

export const makeForgotPasswordService = (): ForgotPasswordService => {
  return new ForgotPasswordService(makeUserRepository());
};
