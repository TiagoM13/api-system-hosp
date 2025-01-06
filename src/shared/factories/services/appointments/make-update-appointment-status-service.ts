import { UpdateAppointmentStatusService } from '@modules/appointments/useCases/update-appointment-status/update-appointment-status-service';
import {
  makeAppointmentRepository,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeUpdateAppointmentStatusService =
  (): UpdateAppointmentStatusService => {
    return new UpdateAppointmentStatusService(
      makeAppointmentRepository(),
      makePrismaPatientRepository(),
    );
  };
