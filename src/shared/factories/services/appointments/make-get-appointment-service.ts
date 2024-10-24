import { GetAppointmentService } from '@modules/appointments/useCases/get-appointment/get-appointment-service';
import {
  makeAppointmentRepository,
  makePatientRepository,
} from '@shared/factories/repositories';

export const makeGetAppointmentService = (): GetAppointmentService => {
  return new GetAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
  );
};
