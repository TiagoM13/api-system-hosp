import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { appointmentParamId } from '@modules/appointments/schemas';

import { createAppointmentSchema } from './create-appointment-schema';
import { CreateAppointmentService } from './create-appointment-service';

export class CreateAppointmentController extends BaseController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { patientId } = appointmentParamId.parse(this.request.params);
    const dto = createAppointmentSchema.parse(this.request.body);

    const appointment = await this.createAppointmentService.execute(
      patientId,
      dto,
    );

    return this.created({
      success: true,
      appointment,
    });
  }
}
