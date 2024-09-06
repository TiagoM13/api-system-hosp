import { AppError } from "@app/errors/app-client";
import { IQuery } from "@shared/entities";
import { PatientRepository, QueryRepository } from "@shared/repositories/implementations";

export class CreateQueryService {
  private queryRepository: QueryRepository
  private patientRepository: PatientRepository

  constructor(
    queryRepository: QueryRepository,
    patientRepository: PatientRepository
  ) {
    this.queryRepository = queryRepository;
    this.patientRepository = patientRepository;
  }

  async execute(patientId: string, data: IQuery) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError('Patient not found.');
    }

    const query = await this.queryRepository.create(patientId, data)

    return query
  }
}
