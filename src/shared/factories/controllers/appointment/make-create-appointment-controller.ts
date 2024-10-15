import { CreateAppointmentController } from '@modules/appointments/useCases/create-appointment/create-appointment-controller';
import { makeCreateAppointmentService } from '@shared/factories/services/appointments/make-create-appointment-service';

export const makeCreateAppointmentController =
  (): CreateAppointmentController => {
    return new CreateAppointmentController(makeCreateAppointmentService());
  };
