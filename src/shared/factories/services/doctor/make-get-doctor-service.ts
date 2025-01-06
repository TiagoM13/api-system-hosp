import { GetDoctorService } from '@modules/doctors/useCases/get-doctor/get-doctor-service';
import { makePrismaDoctorRepoistory } from '@shared/factories/repositories';

export const makeGetDoctorService = (): GetDoctorService => {
  return new GetDoctorService(makePrismaDoctorRepoistory());
};
