import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';
import { schemaQuery } from '@modules/users/schemas';

import { GetAllUsersService } from './get-all-users-service';

export class GetAllUsersController {
  private getAllUsersService: GetAllUsersService;

  constructor(getAllUsersService: GetAllUsersService) {
    this.getAllUsersService = getAllUsersService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const queries = schemaQuery.parse(req.query);

      const { users, meta } = await this.getAllUsersService.execute(queries);

      return res.send({
        success: true,
        users,
        meta,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message });
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
