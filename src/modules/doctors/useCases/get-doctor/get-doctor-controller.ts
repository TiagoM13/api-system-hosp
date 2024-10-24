import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { paramIdSchema } from '@shared/utils';

import { GetDoctorService } from './get-doctor-service';

export class GetDoctorController extends BaseController {
  constructor(private readonly getDoctorService: GetDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramIdSchema.parse(this.request.params);

    const doctor = await this.getDoctorService.execute(id);

    return this.ok({
      success: true,
      doctor,
    });
  }
}
