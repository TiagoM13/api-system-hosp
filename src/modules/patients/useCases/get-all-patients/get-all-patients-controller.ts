import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';
import { schemaQuery } from '@modules/patients/schemas';
import { GetAllPatientsService } from './get-all-patients-service';

export class GetAllPatientsController {
  private getAllPatientsService: GetAllPatientsService;

  constructor(getAllPatientsService: GetAllPatientsService) {
    this.getAllPatientsService = getAllPatientsService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const queries = schemaQuery.parse(req.query);

      const { patients, meta } =
        await this.getAllPatientsService.execute(queries);

      return res.status(200).send({
        success: true,
        patients,
        meta,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).send({ message: error.message });
      }

      if (error instanceof ZodError) {
        return res.status(400).send({
          message: 'Invalid request body',
          errors: error.flatten().fieldErrors,
        });
      }

      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
