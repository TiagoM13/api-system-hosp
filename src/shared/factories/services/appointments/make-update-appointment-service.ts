import { UpdateAppointmentService } from '@modules/appointments/useCases/update-appointment/update-appointment-service';
import {
  makeAppointmentRepository,
  makePrismaDoctorRepoistory,
  makePatientRepository,
} from '@shared/factories/repositories';

export const makeUpdateAppointmentService = (): UpdateAppointmentService => {
  return new UpdateAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
    makePrismaDoctorRepoistory(),
  );
};
