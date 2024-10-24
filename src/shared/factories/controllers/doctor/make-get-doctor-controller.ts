import { GetDoctorController } from '@modules/doctors/useCases/get-doctor/get-doctor-controller';
import { makeGetDoctorService } from '@shared/factories/services/doctor/make-get-doctor-service';

export const makeGetDoctorController = (): GetDoctorController => {
  return new GetDoctorController(makeGetDoctorService());
};
