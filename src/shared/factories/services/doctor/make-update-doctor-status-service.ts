import { UpdateDoctorStatusService } from '@modules/doctors/useCases/update-doctor-status/update-doctor-status-service';
import { makeDoctorRepoistory } from '@shared/factories/repositories';

export const makeUpdateDoctorStatusService = (): UpdateDoctorStatusService => {
  return new UpdateDoctorStatusService(makeDoctorRepoistory());
};
