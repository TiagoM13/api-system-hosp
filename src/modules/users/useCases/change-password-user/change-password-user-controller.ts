import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { changePasswordSchema, schemaParams } from '@modules/users/schemas';

import { ChangePasswordUserService } from './change-password-user-service';

export class ChangePasswordUserController extends BaseController {
  constructor(
    private readonly changePasswordUserService: ChangePasswordUserService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { userId } = schemaParams.parse(this.request.params);
    const { password, confirm_password } = changePasswordSchema.parse(
      this.request.body,
    );

    await this.changePasswordUserService.execute(
      userId,
      password,
      confirm_password,
    );

    return this.created({
      success: true,
      message: 'Sua senha foi alterada com sucesso',
    });
  }
}
