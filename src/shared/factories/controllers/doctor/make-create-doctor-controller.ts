import { CreateDoctorController } from '@modules/doctors/useCases/create-doctor/create-doctor-controller';
import { makeCreateDoctorService } from '@shared/factories/services/doctor/make-create-doctor-service';

export const makeCreateDoctorController = (): CreateDoctorController => {
  return new CreateDoctorController(makeCreateDoctorService());
};
