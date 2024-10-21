import { UpdateAppointmentStatusController } from '@modules/appointments/useCases/update-appointment-status/update-appointment-status-controller';
import { makeUpdateAppointmentStatusService } from '@shared/factories/services/appointments/make-update-appointment-status-service';

export const makeUpdateAppointmentStatusController =
  (): UpdateAppointmentStatusController => {
    return new UpdateAppointmentStatusController(
      makeUpdateAppointmentStatusService(),
    );
  };
