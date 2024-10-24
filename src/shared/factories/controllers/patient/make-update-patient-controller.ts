import { UpdatePatientController } from '@modules/patients/useCases/update-patient/update-patient-controller';
import { makeUpdatePatientService } from '@shared/factories/services/patient/make-update-patient-service';

export const makeUpdatePatientController = (): UpdatePatientController => {
  return new UpdatePatientController(makeUpdatePatientService());
};
