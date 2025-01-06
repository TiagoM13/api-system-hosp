import { GetAllAppointmentsService } from '@modules/appointments/useCases/get-all-appointments/get-all-appointments-service';
import { makePrismaAppointmentRepository } from '@shared/factories/repositories';

export const makeGetAllAppointmentsService = (): GetAllAppointmentsService => {
  return new GetAllAppointmentsService(makePrismaAppointmentRepository());
};
