import { GetAllAppointmentsService } from '@modules/appointments/useCases/get-all-appointments/get-all-appointments-service';
import { makeAppointmentRepository } from '@shared/factories/repositories';

export const makeGetAllAppointmentsService = (): GetAllAppointmentsService => {
  return new GetAllAppointmentsService(makeAppointmentRepository());
};
