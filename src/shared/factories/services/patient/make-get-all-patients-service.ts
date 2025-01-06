import { GetAllPatientsService } from '@modules/patients/useCases/get-all-patients/get-all-patients-service';
import { makePrismaPatientRepository } from '@shared/factories/repositories';

export const makeGetAllPatientsService = (): GetAllPatientsService => {
  return new GetAllPatientsService(makePrismaPatientRepository());
};
