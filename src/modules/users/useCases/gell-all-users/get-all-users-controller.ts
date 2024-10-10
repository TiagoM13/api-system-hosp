import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { paginateSchema } from '@shared/utils';

import { GetAllUsersService } from './get-all-users-service';

export class GetAllUsersController extends BaseController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = paginateSchema.parse(this.request.query);

    const results = await this.getAllUsersService.execute(query);

    return this.paginate(results, 'users');
  }
}
