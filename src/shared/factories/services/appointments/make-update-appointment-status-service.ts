import { UpdateAppointmentStatusService } from '@modules/appointments/useCases/update-appointment-status/update-appointment-status-service';
import { makeAppointmentRepository } from '@shared/factories/repositories/make-appointment-repository';
import { makePatientRepository } from '@shared/factories/repositories/make-patient-repository';

export const makeUpdateAppointmentStatusService =
  (): UpdateAppointmentStatusService => {
    return new UpdateAppointmentStatusService(
      makeAppointmentRepository(),
      makePatientRepository(),
    );
  };
