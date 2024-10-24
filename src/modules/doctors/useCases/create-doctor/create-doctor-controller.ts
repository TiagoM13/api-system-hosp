import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { doctorDataSchema } from '@modules/doctors/schemas';

import { CreateDoctorService } from './create-doctor-service';

export class CreateDoctorController extends BaseController {
  constructor(private readonly createDoctorService: CreateDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const dto = doctorDataSchema.parse(this.request.body);

    const doctor = await this.createDoctorService.execute(dto);

    return this.created({
      success: true,
      doctor,
    });
  }
}
