import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentParamsSchema } from '@modules/appointments/schemas';

import { GetAppointmentService } from './get-appointment-service';

export class GetAppointmentController extends BaseController {
  constructor(private readonly getAppointmentService: GetAppointmentService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { appointmentId: queryId, patientId } = appointmentParamsSchema.parse(
      this.request.params,
    );

    const appointment = await this.getAppointmentService.execute(
      queryId,
      patientId,
    );

    return this.ok({
      success: true,
      appointment,
    });
  }
}
