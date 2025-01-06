import { AppError } from '@app/errors/app-client';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { IPatient } from '@shared/entities';

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
