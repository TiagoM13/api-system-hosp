import { GetAllPatientsController } from '@modules/patients/useCases/get-all-patients/get-all-patients-controller';
import { makeGetAllPatientsService } from '@shared/factories/services/patient/make-get-all-patients-service';

export const makeGetAllPatientsController = (): GetAllPatientsController => {
  return new GetAllPatientsController(makeGetAllPatientsService());
};
