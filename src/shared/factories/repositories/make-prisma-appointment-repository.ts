import { PrismaAppointmentRepository } from '@modules/appointments/infra/prisma/prisma-appointment-repository';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';

export const makePrismaAppointmentRepository = (): AppointmentRepository => {
  return new PrismaAppointmentRepository();
};
