import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';
import { GetQueryService } from './get-query-service';
import { GetQueryController } from './get-query-controller';

export function getQueryFactory() {
  const patientRepository = new PatientRepository();
  const queryRepository = new QueryRepository();
  const service = new GetQueryService(queryRepository, patientRepository);
  const controller = new GetQueryController(service);

  return controller;
}

export default getQueryFactory;
