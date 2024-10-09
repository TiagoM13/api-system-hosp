import { MakePatientRepository } from '@shared/factories/repositories/make-patient-repository';

import { GetPatientController } from './get-patient-controller';
import { GetPatientService } from './get-patient-service';

export function getPatientFactory() {
  const service = new GetPatientService(MakePatientRepository());
  const controller = new GetPatientController(service);

  return controller;
}

export default getPatientFactory;
