import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { paramIdSchema } from '@shared/utils';

import { DeleteDoctorService } from './delete-doctor-service';

export class DeleteDoctorController extends BaseController {
  constructor(private readonly deleteDoctorService: DeleteDoctorService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = paramIdSchema.parse(this.request.params);

    await this.deleteDoctorService.execute(id);

    return this.ok();
  }
}
