import { GetAllAppointmentsService } from '@modules/appointments/useCases/get-all-appointments/get-all-appointments-service';
import { makeAppointmentRepository } from '@shared/factories/repositories/make-appointment-repository';
import { makePatientRepository } from '@shared/factories/repositories/make-patient-repository';

export const makeGetAllAppointmentsService = (): GetAllAppointmentsService => {
  return new GetAllAppointmentsService(
    makeAppointmentRepository(),
    makePatientRepository(),
  );
};
