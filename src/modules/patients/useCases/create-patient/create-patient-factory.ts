import { PatientRepository } from '@shared/repositories/implementations';

import { CreatePatientController } from './create-patient-controller';
import { CreatePatientService } from './create-patient-service';

export function createPatientFactory() {
  const repository = new PatientRepository();
  const service = new CreatePatientService(repository);
  const controller = new CreatePatientController(service);

  return controller;
}

export default createPatientFactory;
