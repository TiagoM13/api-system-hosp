import { UpdateAppointmentService } from '@modules/appointments/useCases/update-appointment/update-appointment-service';
import {
  makePrismaAppointmentRepository,
  makePrismaDoctorRepoistory,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeUpdateAppointmentService = (): UpdateAppointmentService => {
  return new UpdateAppointmentService(
    makePrismaAppointmentRepository(),
    makePrismaPatientRepository(),
    makePrismaDoctorRepoistory(),
  );
};
