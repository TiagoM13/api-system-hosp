import { MakePatientRepository } from '@shared/factories/repositories/make-patient-repository';

import { GetAllPatientsController } from './get-all-patients-controller';
import { GetAllPatientsService } from './get-all-patients-service';

export function getAllPatientsFactory() {
  const service = new GetAllPatientsService(MakePatientRepository());
  const controller = new GetAllPatientsController(service);

  return controller;
}

export default getAllPatientsFactory;
