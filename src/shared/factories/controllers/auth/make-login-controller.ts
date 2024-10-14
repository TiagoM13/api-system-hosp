import { LoginController } from '@modules/auth/useCases/login/login-controller';

import { makeLoginService } from '../../services/auth/make-login-service';

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginService());
};
