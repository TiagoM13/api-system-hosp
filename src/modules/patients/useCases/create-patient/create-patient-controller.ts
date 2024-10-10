import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { patientDataSchema } from '../../schemas/body';
import { CreatePatientService } from './create-patient-service';

export class CreatePatientController extends BaseController {
  constructor(private readonly createPatientService: CreatePatientService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const dto = patientDataSchema.parse(this.request.body);

    const patient = await this.createPatientService.execute(dto);

    return this.created({
      success: true,
      patient,
    });
  }
}
