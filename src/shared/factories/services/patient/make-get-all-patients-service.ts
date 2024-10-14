import { GetAllPatientsService } from '@modules/patients/useCases/get-all-patients/get-all-patients-service';

import { MakePatientRepository } from '../../repositories/make-patient-repository';

export const makeGetAllPatientsService = (): GetAllPatientsService => {
  return new GetAllPatientsService(MakePatientRepository());
};
