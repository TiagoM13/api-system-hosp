import { CreatePatientService } from '@modules/patients/useCases/create-patient/create-patient-service';
import { makePrismaPatientRepository } from '@shared/factories/repositories';

export const makeCreatePatientService = (): CreatePatientService => {
  return new CreatePatientService(makePrismaPatientRepository());
};
