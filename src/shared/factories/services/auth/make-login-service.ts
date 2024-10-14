import { LoginService } from '@modules/auth/useCases/login/login-service';

import { makeUserRepository } from '../../repositories/make-user-repository';

export const makeLoginService = (): LoginService => {
  return new LoginService(makeUserRepository());
};
