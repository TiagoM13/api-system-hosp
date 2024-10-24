import { ForgotPasswordController } from '@modules/auth/useCases/forgot-password/forgot-password-controller';
import { makeForgotPasswordService } from '@shared/factories/services/auth/make-forgot-password-service';

export const makeForgotPasswordController = (): ForgotPasswordController => {
  return new ForgotPasswordController(makeForgotPasswordService());
};
