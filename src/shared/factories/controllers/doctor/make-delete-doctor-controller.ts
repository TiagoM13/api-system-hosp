import { DeleteDoctorController } from '@modules/doctors/useCases/delete-doctor/delete-doctor-controller';
import { makeDeleteDoctorService } from '@shared/factories/services/doctor/make-delete-doctor-service';

export const makeDeleteDoctorController = (): DeleteDoctorController => {
  return new DeleteDoctorController(makeDeleteDoctorService());
};
