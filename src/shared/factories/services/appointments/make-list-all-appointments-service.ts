import { ListAllAppointmentsService } from '@modules/appointments/useCases/list-all-appointments/list-all-appointments-service';
import { makeAppointmentRepository } from '@shared/factories/repositories';

export const makeListAllAppointmentsService =
  (): ListAllAppointmentsService => {
    return new ListAllAppointmentsService(makeAppointmentRepository());
  };
