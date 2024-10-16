import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { schemaQuery } from '@modules/appointments/schemas';

import { ListAllAppointmentsService } from './list-all-appointments-service';

export class ListAllAppointmentsController extends BaseController {
  constructor(
    private readonly listAllAppointmentsService: ListAllAppointmentsService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = schemaQuery.parse(this.request.query);

    const results = await this.listAllAppointmentsService.execute(query);

    return this.paginate(results, 'list-all-appointments');
  }
}
