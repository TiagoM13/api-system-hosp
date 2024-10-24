import { AppointmentRepository } from '@shared/repositories/implementations/appointment-repository';
import { IAppointmentRepository } from '@shared/repositories/interfaces/appointment';

export const makeAppointmentRepository = (): IAppointmentRepository => {
  return new AppointmentRepository();
};
