import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';
import { schemaBody, schemaParams } from '@modules/users/schemas';

import { UpdateUserService } from './update-user-service';

export class UpdateUserController {
  private updateUserService: UpdateUserService;

  constructor(updateUserService: UpdateUserService) {
    this.updateUserService = updateUserService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = schemaParams.parse(req.params);
      const data = schemaBody.parse(req.body);

      const updatedUser = await this.updateUserService.execute(userId, data);

      return res.status(201).send({
        success: true,
        user: updatedUser,
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
