import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import {
  appointmentParamId,
  appointmentQuerySchema,
} from '@modules/appointments/schemas';

import { GetAllAppointmentsService } from './get-all-appointments-service';

export class GetAllAppointmentsController extends BaseController {
  constructor(
    private readonly getAllAppointmentsService: GetAllAppointmentsService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { patientId } = appointmentParamId.parse(this.request.params);
    const query = appointmentQuerySchema.parse(this.request.query);

    const results = await this.getAllAppointmentsService.execute({
      patient_id: patientId,
      ...query,
    });

    return this.paginate(results, 'appointments');
  }
}
