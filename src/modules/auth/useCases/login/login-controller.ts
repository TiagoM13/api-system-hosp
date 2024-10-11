import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { authenticationSchema } from '@modules/auth/schemas';

import { LoginService } from './login-service';

export class LoginController extends BaseController {
  constructor(private readonly loginService: LoginService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const data = authenticationSchema.parse(this.request.body);

    const { token, user } = await this.loginService.execute(data);

    return this.created({ success: true, token, user });
  }
}
