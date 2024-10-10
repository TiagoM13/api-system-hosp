import { AppError } from '@app/errors/app-client';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { IPatient } from '@shared/entities';
import { PatientRepository } from '@shared/repositories/implementations';

export class GetPatientService {
  constructor(private readonly patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(id: string): Promise<IPatient> {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND);
    }

    return patient;
  }
}
