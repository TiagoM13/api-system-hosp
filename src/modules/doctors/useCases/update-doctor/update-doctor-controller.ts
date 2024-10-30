import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { intIdParamSchema } from '@shared/utils';

import { updateDoctorSchema } from './update-doctor-schema';
import { UpdateDoctorService } from './update-doctor-service';

export class UpdateDoctorController extends BaseController {
  constructor(private readonly updateDoctorService: UpdateDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = intIdParamSchema.parse(this.request.params);
    const dto = updateDoctorSchema.parse(this.request.body);

    const updatedDoctor = await this.updateDoctorService.execute(id, dto);

    return this.ok({
      success: true,
      doctor: updatedDoctor,
    });
  }
}
