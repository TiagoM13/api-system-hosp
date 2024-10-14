import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { paramIdSchema } from '@shared/utils';

import { DeleteUserService } from './delete-user-service';

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUserService: DeleteUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramIdSchema.parse(this.request.params);

    await this.deleteUserService.execute(id);

    return this.ok();
  }
}
