import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import {
  appointmentDataSchema,
  appointmentParamId,
} from '@modules/appointments/schemas';

import { CreateAppointmentService } from './create-appointment-service';

export class CreateAppointmentController extends BaseController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { patientId } = appointmentParamId.parse(this.request.params);
    const data = appointmentDataSchema.parse(this.request.body);

    const appointment = await this.createAppointmentService.execute(patientId, {
      ...data,
      patient_id: patientId,
    });

    return this.created({
      success: true,
      appointment,
    });
  }
}
