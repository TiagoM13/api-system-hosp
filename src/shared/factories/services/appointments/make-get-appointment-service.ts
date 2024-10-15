import { GetAppointmentService } from '@modules/appointments/useCases/get-appointment/get-appointment-service';
import { makeAppointmentRepository } from '@shared/factories/repositories/make-appointment-repository';
import { makePatientRepository } from '@shared/factories/repositories/make-patient-repository';

export const makeGetAppointmentService = (): GetAppointmentService => {
  return new GetAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
  );
};
