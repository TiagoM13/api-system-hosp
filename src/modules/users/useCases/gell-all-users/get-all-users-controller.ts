import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaQuery } from '@modules/users/schemas';

import { GetAllUsersService } from './get-all-users-service';

export class GetAllUsersController extends BaseController {
  constructor(private readonly getAllUsersService: GetAllUsersService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = schemaQuery.parse(this.request.query);

    const results = await this.getAllUsersService.execute(query);

    return this.paginate(results, 'users');
  }
}
