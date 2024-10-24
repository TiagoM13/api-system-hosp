import { AppointmentRepository } from '@shared/repositories/implementations';
import { IAppointmentRepository } from '@shared/repositories/interfaces/appointment';

export const makeAppointmentRepository = (): IAppointmentRepository => {
  return new AppointmentRepository();
};
