import { CreateDoctorService } from '@modules/doctors/useCases/create-doctor/create-doctor-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories/make-doctor-repository';

export const makeCreateDoctorService = (): CreateDoctorService => {
  return new CreateDoctorService(makeDoctorRepoistory());
};
