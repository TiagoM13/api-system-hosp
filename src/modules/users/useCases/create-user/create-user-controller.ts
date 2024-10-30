import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { createUserSchema } from './create-user-schema';
import { CreateUserService } from './create-user-service';

export class CreateUserController extends BaseController {
  constructor(private readonly createUserService: CreateUserService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const dto = createUserSchema.parse(this.request.body);

    const user = await this.createUserService.execute(dto);

    return this.created({ success: true, user });
  }
}
