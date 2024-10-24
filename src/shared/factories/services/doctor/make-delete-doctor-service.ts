import { DeleteDoctorService } from '@modules/doctors/useCases/delete-doctor/delete-doctor-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories/make-doctor-repository';

export const makeDeleteDoctorService = (): DeleteDoctorService => {
  return new DeleteDoctorService(makeDoctorRepoistory());
};
