import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentQuerySchema } from '@modules/appointments/schemas';

import { GetAllAppointmentsService } from './get-all-appointments-service';

export class GetAllAppointmentsController extends BaseController {
  constructor(
    private readonly listAllAppointmentsService: GetAllAppointmentsService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = appointmentQuerySchema.parse(this.request.query);

    const results = await this.listAllAppointmentsService.execute(query);

    return this.paginate(results, 'get-all-appointments');
  }
}
