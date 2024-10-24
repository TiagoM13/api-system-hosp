import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { doctorDataSchema } from '@modules/doctors/schemas';
import { paramIdSchema } from '@shared/utils';

import { UpdateDoctorService } from './update-doctor-service';

export class UpdateDoctorController extends BaseController {
  constructor(private readonly updateDoctorService: UpdateDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramIdSchema.parse(this.request.params);
    const dto = doctorDataSchema.parse(this.request.body);

    const updatedDoctor = await this.updateDoctorService.execute(id, dto);

    return this.ok({
      success: true,
      doctor: updatedDoctor,
    });
  }
}
