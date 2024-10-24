import { UpdateDoctorService } from '@modules/doctors/useCases/update-doctor/update-doctor-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories/make-doctor-repository';

export const makeUpdateDoctorService = (): UpdateDoctorService => {
  return new UpdateDoctorService(makeDoctorRepoistory());
};
