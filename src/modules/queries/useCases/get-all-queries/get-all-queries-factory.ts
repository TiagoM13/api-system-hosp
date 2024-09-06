import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';
import { GetAllQueriesService } from './get-all-queries-service';
import { GetAllQueriesController } from './get-all-queries-controller';

export function getAllQueriesFactory() {
  const patientRepository = new PatientRepository();
  const queryRepository = new QueryRepository();
  const service = new GetAllQueriesService(queryRepository, patientRepository);
  const controller = new GetAllQueriesController(service);

  return controller;
}

export default getAllQueriesFactory;
