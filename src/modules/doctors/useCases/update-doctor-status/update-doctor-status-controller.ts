import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { intIdParamSchema } from '@shared/utils';

import { updateDoctorStatusSchema } from './update-doctor-status-schema';
import { UpdateDoctorStatusService } from './update-doctor-status-service';

export class UpdateDoctorStatusController extends BaseController {
  constructor(
    private readonly updateDoctorStatusService: UpdateDoctorStatusService,
  ) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const { id } = intIdParamSchema.parse(this.request.params);
    const dto = updateDoctorStatusSchema.parse(this.request.body);

    const { status } = await this.updateDoctorStatusService.execute(id, dto);

    return this.ok({
      success: true,
      message: `Status do médico atualizado para ${status}`,
    });
  }
}
