import { GetAppointmentsByPatientService } from '@modules/appointments/useCases/get-appointments-by-patient/get-appointments-by-patient-service';
import {
  makeAppointmentRepository,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeGetAppointmentsByPatientService =
  (): GetAppointmentsByPatientService => {
    return new GetAppointmentsByPatientService(
      makeAppointmentRepository(),
      makePrismaPatientRepository(),
    );
  };
