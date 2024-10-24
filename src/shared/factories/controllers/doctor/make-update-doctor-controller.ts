import { UpdateDoctorController } from '@modules/doctors/useCases/update-doctor/update-doctor-controller';
import { makeUpdateDoctorService } from '@shared/factories/services/doctor/make-update-doctor-service';

export const makeUpdateDoctorController = (): UpdateDoctorController => {
  return new UpdateDoctorController(makeUpdateDoctorService());
};
