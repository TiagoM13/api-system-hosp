import {
  PatientRepository,
  QueryRepository,
} from '@shared/repositories/implementations';

import { UpdateQueryController } from './update-query-controller';
import { UpdateQueryService } from './update-query-service';

export function updateQueryFactory() {
  const patientRepository = new PatientRepository();
  const queryRepository = new QueryRepository();
  const service = new UpdateQueryService(queryRepository, patientRepository);
  const controller = new UpdateQueryController(service);

  return controller;
}

export default updateQueryFactory;
