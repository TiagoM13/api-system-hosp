import { MakePatientRepository } from '@shared/factories/repositories/make-patient-repository';

import { CreatePatientController } from './create-patient-controller';
import { CreatePatientService } from './create-patient-service';

export function createPatientFactory() {
  const service = new CreatePatientService(MakePatientRepository());
  const controller = new CreatePatientController(service);

  return controller;
}

export default createPatientFactory;
