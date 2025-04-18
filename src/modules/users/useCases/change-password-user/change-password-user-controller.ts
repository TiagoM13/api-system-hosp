import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { uuidParamSchema } from '@shared/utils';

import { changePasswordUserSchema } from './change-password-user-schema';
import { ChangePasswordUserService } from './change-password-user-service';

export class ChangePasswordUserController extends BaseController {
  constructor(
    private readonly changePasswordUserService: ChangePasswordUserService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = uuidParamSchema.parse(this.request.params);
    const dto = changePasswordUserSchema.parse(this.request.body);

    await this.changePasswordUserService.execute(id, dto);

    return this.created({
      success: true,
      message: 'Sua senha foi alterada com sucesso',
    });
  }
}
