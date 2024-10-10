import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { patientDataSchema } from '../../schemas/body';
import { paramSchema } from '../../schemas/params';
import { UpdatePatientService } from './update-patient-service';

export class UpdatePatientController extends BaseController {
  constructor(private readonly updatePatientService: UpdatePatientService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramSchema.parse(this.request.params);
    const data = patientDataSchema.parse(this.request.body);

    const updatedPatient = await this.updatePatientService.execute(id, data);

    return this.ok({
      succes: true,
      patient: updatedPatient,
    });
  }
}
