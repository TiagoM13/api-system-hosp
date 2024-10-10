import { GetPatientController } from '@modules/patients/useCases/get-patient/get-patient-controller';

import { makeGetPatientService } from '../../services/patient/make-get-patient-service';

export const makeGetPatientController = (): GetPatientController => {
  return new GetPatientController(makeGetPatientService());
};
