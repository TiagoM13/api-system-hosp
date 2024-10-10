import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaBody } from '@modules/users/schemas';

import { CreateUserService } from './create-user-service';

export class CreateUserController extends BaseController {
  constructor(private readonly createUserService: CreateUserService) {
    super();
  }

  async handle(): Promise<FastifyReply> {
    const data = schemaBody.parse(this.request.body);

    const user = await this.createUserService.execute(data);

    return this.created({ success: true, user });
  }
}
