import { GetAppointmentsByPatientController } from '@modules/appointments/useCases/get-appointments-by-patient/get-appointments-by-patient-controller';
import { makeGetAppointmentsByPatientService } from '@shared/factories/services/appointments/make-get-appointments-by-patient-service';

export const makeGetAppointmentsByPatientController =
  (): GetAppointmentsByPatientController => {
    return new GetAppointmentsByPatientController(
      makeGetAppointmentsByPatientService(),
    );
  };
