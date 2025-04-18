import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { uuidParamSchema } from '@shared/utils';

import { GetUserService } from './get-user-service';

export class GetUserController extends BaseController {
  constructor(private readonly getUserService: GetUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = uuidParamSchema.parse(this.request.params);

    const user = await this.getUserService.execute(id);

    return this.ok({ success: true, user });
  }
}
