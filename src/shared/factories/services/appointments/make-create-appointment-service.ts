import { CreateAppointmentService } from '@modules/appointments/useCases/create-appointment/create-appointment-service';
import {
  makeAppointmentRepository,
  makePrismaDoctorRepoistory,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeCreateAppointmentService = (): CreateAppointmentService => {
  return new CreateAppointmentService(
    makeAppointmentRepository(),
    makePrismaPatientRepository(),
    makePrismaDoctorRepoistory(),
  );
};
