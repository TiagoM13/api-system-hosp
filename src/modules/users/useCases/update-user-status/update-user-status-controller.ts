import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { STATUS_LABELS } from '@shared/constants/labels';
import { IUser } from '@shared/entities';
import { uuidParamSchema } from '@shared/utils';

import { updateUserStatusSchema } from './update-user-status-schema';
import { UpdateUserStatusService } from './update-user-status-service';

export class UpdateUserStatusController extends BaseController {
  constructor(
    private readonly updateUserStatusService: UpdateUserStatusService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = uuidParamSchema.parse(this.request.params);
    const dto = updateUserStatusSchema.parse(this.request.body);
    const loggedInUser = this.request.user as IUser;

    const status = await this.updateUserStatusService.execute(
      id,
      dto,
      loggedInUser,
    );

    return this.ok({
      success: true,
      message: `Status do usuário atualizado para ${STATUS_LABELS[status]}.`,
    });
  }
}
