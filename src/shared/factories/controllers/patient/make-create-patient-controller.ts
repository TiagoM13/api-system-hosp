import { CreatePatientController } from '@modules/patients/useCases/create-patient/create-patient-controller';
import { makeCreatePatientService } from '@shared/factories/services/patient/make-create-patient-service';

export const makeCreatePatientController = (): CreatePatientController => {
  return new CreatePatientController(makeCreatePatientService());
};
