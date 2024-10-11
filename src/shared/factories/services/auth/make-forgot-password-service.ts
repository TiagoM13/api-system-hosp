import { ForgotPasswordService } from '@modules/auth/useCases/forgot-password/forgot-password-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeForgotPasswordService = (): ForgotPasswordService => {
  return new ForgotPasswordService(makeUserRepository());
};
