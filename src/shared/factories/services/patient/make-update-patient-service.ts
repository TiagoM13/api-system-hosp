import { UpdatePatientService } from '@modules/patients/useCases/update-patient/update-patient-service';
import { makePrismaPatientRepository } from '@shared/factories/repositories';

export const makeUpdatePatientService = (): UpdatePatientService => {
  return new UpdatePatientService(makePrismaPatientRepository());
};
