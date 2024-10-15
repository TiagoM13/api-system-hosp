import { CreatePatientService } from '@modules/patients/useCases/create-patient/create-patient-service';

import { makePatientRepository } from '../../repositories/make-patient-repository';

export const makeCreatePatientService = (): CreatePatientService => {
  return new CreatePatientService(makePatientRepository());
};
