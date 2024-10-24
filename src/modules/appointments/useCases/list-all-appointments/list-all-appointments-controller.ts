import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentQuerySchema } from '@modules/appointments/schemas';

import { ListAllAppointmentsService } from './list-all-appointments-service';

export class ListAllAppointmentsController extends BaseController {
  constructor(
    private readonly listAllAppointmentsService: ListAllAppointmentsService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = appointmentQuerySchema.parse(this.request.query);

    const results = await this.listAllAppointmentsService.execute(query);

    return this.paginate(results, 'list-all-appointments');
  }
}
