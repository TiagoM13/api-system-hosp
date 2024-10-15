import { UpdateAppointmentService } from '@modules/appointments/useCases/update-appointment/update-appointment-service';
import { makeAppointmentRepository } from '@shared/factories/repositories/make-appointment-repository';
import { makePatientRepository } from '@shared/factories/repositories/make-patient-repository';

export const makeUpdateAppointmentService = (): UpdateAppointmentService => {
  return new UpdateAppointmentService(
    makeAppointmentRepository(),
    makePatientRepository(),
  );
};
