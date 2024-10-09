import { AppError } from '@app/errors/app-client';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { PatientRepository } from '@shared/repositories/implementations';

export class GetPatientService {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(id: string) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND);
    }

    return patient;
  }
}
