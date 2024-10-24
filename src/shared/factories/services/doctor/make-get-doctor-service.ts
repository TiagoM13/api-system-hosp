import { GetDoctorService } from '@modules/doctors/useCases/get-doctor/get-doctor-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories/make-doctor-repository';

export const makeGetDoctorService = (): GetDoctorService => {
  return new GetDoctorService(makeDoctorRepoistory());
};
