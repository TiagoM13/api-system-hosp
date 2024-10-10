import { GetPatientService } from '@modules/patients/useCases/get-patient/get-patient-service';

import { MakePatientRepository } from '../../repositories/make-patient-repository';

export const makeGetPatientService = (): GetPatientService => {
  return new GetPatientService(MakePatientRepository());
};
