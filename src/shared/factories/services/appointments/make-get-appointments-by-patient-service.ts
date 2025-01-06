import { GetAppointmentsByPatientService } from '@modules/appointments/useCases/get-appointments-by-patient/get-appointments-by-patient-service';
import {
  makePrismaAppointmentRepository,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeGetAppointmentsByPatientService =
  (): GetAppointmentsByPatientService => {
    return new GetAppointmentsByPatientService(
      makePrismaAppointmentRepository(),
      makePrismaPatientRepository(),
    );
  };
