import { GetAllDoctorsService } from '@modules/doctors/useCases/get-all-doctors/get-all-doctors-service';
import { makePrismaDoctorRepoistory } from '@shared/factories/repositories';

export const makeGetAllDoctorsService = (): GetAllDoctorsService => {
  return new GetAllDoctorsService(makePrismaDoctorRepoistory());
};
