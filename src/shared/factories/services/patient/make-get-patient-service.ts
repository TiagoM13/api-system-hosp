import { GetPatientService } from '@modules/patients/useCases/get-patient/get-patient-service';
import { makePrismaPatientRepository } from '@shared/factories/repositories';

export const makeGetPatientService = (): GetPatientService => {
  return new GetPatientService(makePrismaPatientRepository());
};
