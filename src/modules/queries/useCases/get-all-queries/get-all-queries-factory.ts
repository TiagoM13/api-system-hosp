import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';

import { GetAllQueriesController } from './get-all-queries-controller';
import { GetAllQueriesService } from './get-all-queries-service';

export function getAllQueriesFactory() {
  const patientRepository = new PatientRepository();
  const queryRepository = new QueryRepository();
  const service = new GetAllQueriesService(queryRepository, patientRepository);
  const controller = new GetAllQueriesController(service);

  return controller;
}

export default getAllQueriesFactory;
