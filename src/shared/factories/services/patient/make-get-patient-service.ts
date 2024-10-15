import { GetPatientService } from '@modules/patients/useCases/get-patient/get-patient-service';

import { makePatientRepository } from '../../repositories/make-patient-repository';

export const makeGetPatientService = (): GetPatientService => {
  return new GetPatientService(makePatientRepository());
};
