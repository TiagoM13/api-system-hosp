import { ListAllAppointmentsController } from '@modules/appointments/useCases/list-all-appointments/list-all-appointments-controller';
import { makeListAllAppointmentsService } from '@shared/factories/services/appointments/make-list-all-appointments-service';

export const makeListAllAppointmentsController =
  (): ListAllAppointmentsController => {
    return new ListAllAppointmentsController(makeListAllAppointmentsService());
  };
