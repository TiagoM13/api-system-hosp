import { CreateAppointmentService } from '@modules/appointments/useCases/create-appointment/create-appointment-service';
import {
  makeAppointmentRepository,
  makeDoctorRepoistory,
  makePatientRepository,
} from '@shared/factories/repositories';

export const makeCreateAppointmentService = (): CreateAppointmentService => {
  return new CreateAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
    makeDoctorRepoistory(),
  );
};
