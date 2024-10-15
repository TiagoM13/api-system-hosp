import { GetAllPatientsService } from '@modules/patients/useCases/get-all-patients/get-all-patients-service';

import { makePatientRepository } from '../../repositories/make-patient-repository';

export const makeGetAllPatientsService = (): GetAllPatientsService => {
  return new GetAllPatientsService(makePatientRepository());
};
