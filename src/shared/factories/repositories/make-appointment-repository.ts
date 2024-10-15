import { AppointmentRepository } from '@shared/repositories/implementations/appointment-repository';

export const makeAppointmentRepository = (): AppointmentRepository => {
  return new AppointmentRepository();
};
