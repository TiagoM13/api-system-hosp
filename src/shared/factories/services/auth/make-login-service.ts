import { LoginService } from '@modules/auth/useCases/login/login-service';
import { makePrismaUserRepository } from '@shared/factories/repositories';

export const makeLoginService = (): LoginService => {
  return new LoginService(makePrismaUserRepository());
};
