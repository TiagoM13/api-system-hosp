import { FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { paginateSchema } from '../../schemas/paginate';
import { GetAllPatientsService } from './get-all-patients-service';

export class GetAllPatientsController extends BaseController {
  constructor(private readonly getAllPatientsService: GetAllPatientsService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const query = paginateSchema.parse(this.request.query);

    const results = await this.getAllPatientsService.execute(query);

    return this.paginate(results, 'patients');
  }
}
