import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { paramSchema } from '../../schemas/params';
import { GetPatientService } from './get-patient-service';

export class GetPatientController extends BaseController {
  constructor(private readonly getPatientService: GetPatientService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramSchema.parse(this.request.params);

    const patient = await this.getPatientService.execute(id);

    return this.ok({
      success: true,
      patient,
    });
  }
}
