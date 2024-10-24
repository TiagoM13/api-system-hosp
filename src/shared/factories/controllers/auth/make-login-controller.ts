import { LoginController } from '@modules/auth/useCases/login/login-controller';
import { makeLoginService } from '@shared/factories/services/auth/make-login-service';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginService());
};
