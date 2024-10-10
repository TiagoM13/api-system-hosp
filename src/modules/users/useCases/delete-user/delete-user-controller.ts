import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaParams } from '@modules/users/schemas';

import { DeleteUserService } from './delete-user-service';

export class DeleteUserController extends BaseController {
  constructor(private readonly deleteUserService: DeleteUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { userId } = schemaParams.parse(this.request.params);

    await this.deleteUserService.execute(userId);

    return this.ok();
  }
}
