import { CreateAppointmentService } from '@modules/appointments/useCases/create-appointment/create-appointment-service';
import { makeAppointmentRepository } from '@shared/factories/repositories/make-appointment-repository';
import { makePatientRepository } from '@shared/factories/repositories/make-patient-repository';

export const makeCreateAppointmentService = (): CreateAppointmentService => {
  return new CreateAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
  );
};
