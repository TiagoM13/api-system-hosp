import { UpdatePatientService } from '@modules/patients/useCases/update-patient/update-patient-service';

import { makePatientRepository } from '../../repositories/make-patient-repository';

export const makeUpdatePatientService = (): UpdatePatientService => {
  return new UpdatePatientService(makePatientRepository());
};
