import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { createDoctorSchema } from './create-doctor-schema';
import { CreateDoctorService } from './create-doctor-service';

export class CreateDoctorController extends BaseController {
  constructor(private readonly createDoctorService: CreateDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const dto = createDoctorSchema.parse(this.request.body);

    const doctor = await this.createDoctorService.execute(dto);

    return this.created({
      success: true,
      doctor,
    });
  }
}
