import { DeleteDoctorService } from '@modules/doctors/useCases/delete-doctor/delete-doctor-service';
import { makePrismaDoctorRepoistory } from '@shared/factories/repositories';

export const makeDeleteDoctorService = (): DeleteDoctorService => {
  return new DeleteDoctorService(makePrismaDoctorRepoistory());
};
