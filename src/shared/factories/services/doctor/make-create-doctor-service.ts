import { CreateDoctorService } from '@modules/doctors/useCases/create-doctor/create-doctor-service';
import { makePrismaDoctorRepoistory } from '@shared/factories/repositories';

export const makeCreateDoctorService = (): CreateDoctorService => {
  return new CreateDoctorService(makePrismaDoctorRepoistory());
};
