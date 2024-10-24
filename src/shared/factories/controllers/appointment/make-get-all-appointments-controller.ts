import { GetAllAppointmentsController } from '@modules/appointments/useCases/get-all-appointments/get-all-appointments-controller';
import { makeGetAllAppointmentsService } from '@shared/factories/services/appointments/make-get-all-appointments-service';

export const makeGetAllAppointmentsController =
  (): GetAllAppointmentsController => {
    return new GetAllAppointmentsController(makeGetAllAppointmentsService());
  };
