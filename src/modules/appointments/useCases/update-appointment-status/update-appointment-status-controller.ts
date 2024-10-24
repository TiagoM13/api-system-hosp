import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentParamsSchema } from '@modules/appointments/schemas';

import { updateAppointmentStatusSchema } from './update-appointment-status-schema';
import { UpdateAppointmentStatusService } from './update-appointment-status-service';

export class UpdateAppointmentStatusController extends BaseController {
  constructor(
    private readonly updateAppointmentStatusService: UpdateAppointmentStatusService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { patientId, appointmentId } = appointmentParamsSchema.parse(
      this.request.params,
    );
    const dto = updateAppointmentStatusSchema.parse(this.request.body);

    const updatedAppointment =
      await this.updateAppointmentStatusService.execute(
        appointmentId,
        patientId,
        dto,
      );

    return this.ok({
      success: true,
      status: `Status alterado para ${updatedAppointment.status}`,
    });
  }
}
