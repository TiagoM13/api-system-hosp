import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import {
  appointmentParamId,
  appointmentQuerySchema,
} from '@modules/appointments/schemas';

import { GetAppointmentsByPatientService } from './get-appointments-by-patient-service';

export class GetAppointmentsByPatientController extends BaseController {
  constructor(
    private readonly getAllAppointmentsService: GetAppointmentsByPatientService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { patientId: patient_id } = appointmentParamId.parse(
      this.request.params,
    );
    const query = appointmentQuerySchema.parse(this.request.query);

    const results = await this.getAllAppointmentsService.execute({
      patient_id,
      ...query,
    });

    return this.paginate(results, 'appointments');
  }
}
