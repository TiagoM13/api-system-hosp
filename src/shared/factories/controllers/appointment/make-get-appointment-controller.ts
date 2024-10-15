import { GetAppointmentController } from '@modules/appointments/useCases/get-appointment/get-appointment-controller';
import { makeGetAppointmentService } from '@shared/factories/services/appointments/make-get-appointment-service';

export const makeGetAppointmentController = (): GetAppointmentController => {
  return new GetAppointmentController(makeGetAppointmentService());
};
