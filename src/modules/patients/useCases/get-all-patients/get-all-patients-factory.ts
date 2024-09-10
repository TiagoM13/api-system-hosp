import { PatientRepository } from '@shared/repositories/implementations';

import { GetAllPatientsController } from './get-all-patients-controller';
import { GetAllPatientsService } from './get-all-patients-service';

export function getAllPatientsFactory() {
  const repository = new PatientRepository();
  const service = new GetAllPatientsService(repository);
  const controller = new GetAllPatientsController(service);

  return controller;
}

export default getAllPatientsFactory;
