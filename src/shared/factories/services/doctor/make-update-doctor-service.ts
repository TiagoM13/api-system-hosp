import { UpdateDoctorService } from '@modules/doctors/useCases/update-doctor/update-doctor-service';
import { makePrismaDoctorRepoistory } from '@shared/factories/repositories';

export const makeUpdateDoctorService = (): UpdateDoctorService => {
  return new UpdateDoctorService(makePrismaDoctorRepoistory());
};
