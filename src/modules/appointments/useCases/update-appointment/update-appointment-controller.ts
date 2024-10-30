import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentParamsSchema } from '@modules/appointments/schemas';

import { updateAppointmentSchema } from './update-appointment-schema';
import { UpdateAppointmentService } from './update-appointment-service';

export class UpdateAppointmentController extends BaseController {
  constructor(
    private readonly updateAppointmentService: UpdateAppointmentService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { appointmentId, patientId } = appointmentParamsSchema.parse(
      this.request.params,
    );
    const dto = updateAppointmentSchema.parse(this.request.body);

    const appointment = await this.updateAppointmentService.execute(
      appointmentId,
      patientId,
      dto,
    );

    return this.ok({
      success: true,
      appointment,
    });
  }
}
