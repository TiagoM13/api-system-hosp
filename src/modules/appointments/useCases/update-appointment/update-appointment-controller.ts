import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import {
  appointmentDataSchema,
  appointmentParamsSchema,
} from '@modules/appointments/schemas';

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
    const data = appointmentDataSchema.parse(this.request.body);

    const appointment = await this.updateAppointmentService.execute(
      appointmentId,
      patientId,
      {
        ...data,
        patient_id: patientId,
      },
    );

    return this.ok({
      success: true,
      query: appointment,
    });
  }
}
