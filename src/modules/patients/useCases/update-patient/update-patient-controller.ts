import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { uuidParamSchema } from '@shared/utils';

import { updatePatientSchema } from './update-patient-schema';
import { UpdatePatientService } from './update-patient-service';

export class UpdatePatientController extends BaseController {
  constructor(private readonly updatePatientService: UpdatePatientService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = uuidParamSchema.parse(this.request.params);
    const dto = updatePatientSchema.parse(this.request.body);

    const updatedPatient = await this.updatePatientService.execute(id, dto);

    return this.ok({
      success: true,
      patient: updatedPatient,
    });
  }
}
