import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { changePasswordUserSchema } from '@modules/users/schemas';
import { intIdParamSchema } from '@shared/utils';

import { ChangePasswordUserService } from './change-password-user-service';

export class ChangePasswordUserController extends BaseController {
  constructor(
    private readonly changePasswordUserService: ChangePasswordUserService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = intIdParamSchema.parse(this.request.params);
    const { password, confirm_password } = changePasswordUserSchema.parse(
      this.request.body,
    );

    await this.changePasswordUserService.execute(
      id,
      password,
      confirm_password,
    );

    return this.created({
      success: true,
      message: 'Sua senha foi alterada com sucesso',
    });
  }
}
