import { CreatePatientService } from '@modules/patients/useCases/create-patient/create-patient-service';

import { MakePatientRepository } from '../../repositories/make-patient-repository';

export const makeCreatePatientService = (): CreatePatientService => {
  return new CreatePatientService(MakePatientRepository());
};
