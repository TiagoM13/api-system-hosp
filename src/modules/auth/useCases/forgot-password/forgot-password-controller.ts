import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { forgotPasswordSchema } from './forgot-password-schema';
import { ForgotPasswordService } from './forgot-password-service';

export class ForgotPasswordController extends BaseController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const data = forgotPasswordSchema.parse(this.request.body);

    await this.forgotPasswordService.execute(data);

    return this.created({
      success: true,
      message: 'Uma nova senha foi enviada para seu endereço de e-mail.',
    });
  }
}
