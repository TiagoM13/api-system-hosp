import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';
import { schemaParams } from '@modules/users/schemas';

import { DeleteUserService } from './delete-user-service';

export class DeleteUserController {
  private deleteUserService: DeleteUserService;

  constructor(deleteUserService: DeleteUserService) {
    this.deleteUserService = deleteUserService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = schemaParams.parse(req.params);

      await this.deleteUserService.execute(userId);

      return res.send();
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
