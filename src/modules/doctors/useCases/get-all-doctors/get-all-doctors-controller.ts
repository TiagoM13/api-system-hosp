import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';
import { paginateSchema } from '@shared/utils';

import { GetAllDoctorsService } from './get-all-doctors-service';

export class GetAllDoctorsController extends BaseController {
  constructor(private readonly getAllDoctorsService: GetAllDoctorsService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = paginateSchema.parse(this.request.query);

    const results = await this.getAllDoctorsService.execute(query);

    return this.paginate(results, 'doctors');
  }
}
