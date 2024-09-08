import { PatientRepository } from '@shared/repositories/implementations';

import { GetPatientController } from './get-patient-controller';
import { GetPatientService } from './get-patient-service';

export function getPatientFactory() {
  const repository = new PatientRepository();
  const service = new GetPatientService(repository);
  const controller = new GetPatientController(service);

  return controller;
}

export default getPatientFactory;
