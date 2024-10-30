import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { intIdParamSchema } from '@shared/utils';

import { updateUserStatusSchema } from './update-user-status-schema';
import { UpdateUserStatusService } from './update-user-status-service';

export class UpdateUserStatusController extends BaseController {
  constructor(
    private readonly updateUserStatusService: UpdateUserStatusService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = intIdParamSchema.parse(this.request.params);
    const dto = updateUserStatusSchema.parse(this.request.body);

    const status = await this.updateUserStatusService.execute(id, dto);

    return this.ok({
      success: true,
      message: `Status do usuário atualizado para ${status}.`,
    });
  }
}
