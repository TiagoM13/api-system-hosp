import { MakePatientRepository } from '@shared/factories/repositories/make-patient-repository';

import { UpdatePatientController } from './update-patient-controller';
import { UpdatePatientService } from './update-patient-service';

export function updatePatientFactory() {
  const service = new UpdatePatientService(MakePatientRepository());
  const controller = new UpdatePatientController(service);

  return controller;
}

export default updatePatientFactory;
