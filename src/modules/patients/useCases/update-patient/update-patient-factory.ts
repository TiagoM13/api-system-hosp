import { PatientRepository } from '@shared/repositories/implementations';

import { UpdatePatientController } from './update-patient-controller';
import { UpdatePatientService } from './update-patient-service';

export function updatePatientFactory() {
  const repository = new PatientRepository();
  const service = new UpdatePatientService(repository);
  const controller = new UpdatePatientController(service);

  return controller;
}

export default updatePatientFactory;
