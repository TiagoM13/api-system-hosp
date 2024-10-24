import { UpdateAppointmentService } from '@modules/appointments/useCases/update-appointment/update-appointment-service';
import {
  makeAppointmentRepository,
  makeDoctorRepoistory,
  makePatientRepository,
} from '@shared/factories/repositories';

export const makeUpdateAppointmentService = (): UpdateAppointmentService => {
  return new UpdateAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
    makeDoctorRepoistory(),
  );
};
