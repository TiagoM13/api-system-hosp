import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';

import { CreateQueryController } from './create-query-controller';
import { CreateQueryService } from './create-query-service';

export function createQueryFactory() {
  const patientRepository = new PatientRepository();
  const queryRepository = new QueryRepository();
  const service = new CreateQueryService(queryRepository, patientRepository);
  const controller = new CreateQueryController(service);

  return controller;
}

export default createQueryFactory;
