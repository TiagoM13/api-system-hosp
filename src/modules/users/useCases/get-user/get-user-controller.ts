import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaParams } from '@modules/users/schemas';

import { GetUserService } from './get-user-service';

export class GetUserController extends BaseController {
  constructor(private readonly getUserService: GetUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { userId } = schemaParams.parse(this.request.params);

    const user = await this.getUserService.execute(userId);

    return this.ok({ success: true, user });
  }
}
