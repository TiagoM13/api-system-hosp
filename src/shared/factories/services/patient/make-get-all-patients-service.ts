import { GetAllPatientsService } from '@modules/patients/useCases/get-all-patients/get-all-patients-service';
import { makePatientRepository } from '@shared/factories/repositories';

export const makeGetAllPatientsService = (): GetAllPatientsService => {
  return new GetAllPatientsService(makePatientRepository());
};
