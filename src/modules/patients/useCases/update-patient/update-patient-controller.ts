import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

import { AppError } from '@app/errors/app-client';

import { patientDataSchema } from '../../schemas/body';
import { paramSchema } from '../../schemas/params';
import { UpdatePatientService } from './update-patient-service';

export class UpdatePatientController {
  private updatePatientService: UpdatePatientService;

  constructor(updatePatientService: UpdatePatientService) {
    this.updatePatientService = updatePatientService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = paramSchema.parse(req.params);
      const data = patientDataSchema.parse(req.body);

      const updatedPatient = await this.updatePatientService.execute(id, data);

      return res.status(201).send({
        succes: true,
        patient: updatedPatient,
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
