import { UserRepository } from '@shared/repositories/implementations';

import { LoginController } from './login-controller';
import { LoginService } from './login-service';

export function loginFactory() {
  const repository = new UserRepository();
  const service = new LoginService(repository);
  const controller = new LoginController(service);

  return controller;
}

export default loginFactory;
