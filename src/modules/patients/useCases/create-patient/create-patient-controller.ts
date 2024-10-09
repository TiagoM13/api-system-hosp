import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';

import { patientDataSchema } from '../../schemas/body';
import { CreatePatientService } from './create-patient-service';

export class CreatePatientController {
  private createPatientService: CreatePatientService;

  constructor(createPatientService: CreatePatientService) {
    this.createPatientService = createPatientService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = patientDataSchema.parse(req.body);

      const patient = await this.createPatientService.execute(data);

      return res.status(201).send({
        succes: true,
        patient,
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
