import { UpdateAppointmentController } from '@modules/appointments/useCases/update-appointment/update-appointment-controller';
import { makeUpdateAppointmentService } from '@shared/factories/services/appointments/make-update-appointment-service';

export const makeUpdateAppointmentController =
  (): UpdateAppointmentController => {
    return new UpdateAppointmentController(makeUpdateAppointmentService());
  };
