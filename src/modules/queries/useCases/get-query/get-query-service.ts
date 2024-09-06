import { AppError } from '@app/errors/app-client';
import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';

export class GetQueryService {
  private queryRepository: QueryRepository;
  private patientRepository: PatientRepository;

  constructor(
    queryRepository: QueryRepository,
    patientRepository: PatientRepository,
  ) {
    this.queryRepository = queryRepository;
    this.patientRepository = patientRepository;
  }

  async execute(queryId: number, patientId: string) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Patient not found.');
    }

    const query = await this.queryRepository.findById(queryId);

    if (patientId !== query?.patient_id) {
      throw new AppError('Query not found.');
    }

    return query;
  }
}
