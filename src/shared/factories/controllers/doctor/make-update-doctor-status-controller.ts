import { UpdateDoctorStatusController } from '@modules/doctors/useCases/update-doctor-status/update-doctor-status-controller';
import { makeUpdateDoctorStatusService } from '@shared/factories/services/doctor/make-update-doctor-status-service';

export const makeUpdateDoctorStatusController =
  (): UpdateDoctorStatusController => {
    return new UpdateDoctorStatusController(makeUpdateDoctorStatusService());
  };
