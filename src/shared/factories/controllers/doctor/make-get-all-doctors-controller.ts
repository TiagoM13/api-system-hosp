import { GetAllDoctorsController } from '@modules/doctors/useCases/get-all-doctors/get-all-doctors-controller';
import { makeGetAllDoctorsService } from '@shared/factories/services/doctor/make-get-all-doctors-service';

export const makeGetAllDoctorsController = (): GetAllDoctorsController => {
  return new GetAllDoctorsController(makeGetAllDoctorsService());
};
