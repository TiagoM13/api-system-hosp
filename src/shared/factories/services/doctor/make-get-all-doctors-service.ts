import { GetAllDoctorsService } from '@modules/doctors/useCases/get-all-doctors/get-all-doctors-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories/make-doctor-repository';

export const makeGetAllDoctorsService = (): GetAllDoctorsService => {
  return new GetAllDoctorsService(makeDoctorRepoistory());
};
