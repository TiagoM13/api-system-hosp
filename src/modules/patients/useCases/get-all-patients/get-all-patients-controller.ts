import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { patientsFilterSchema } from './get-all-patients-schema';
import { GetAllPatientsService } from './get-all-patients-service';

export class GetAllPatientsController extends BaseController {
  constructor(private readonly getAllPatientsService: GetAllPatientsService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = patientsFilterSchema.parse(this.request.query);

    const results = await this.getAllPatientsService.execute(query);

    return this.paginate(results, 'patients');
  }
}
