import { UpdateAppointmentService } from '@modules/appointments/useCases/update-appointment/update-appointment-service';
import {
  makeAppointmentRepository,
  makePrismaDoctorRepoistory,
  makePrismaPatientRepository,
} from '@shared/factories/repositories';

export const makeUpdateAppointmentService = (): UpdateAppointmentService => {
  return new UpdateAppointmentService(
    makeAppointmentRepository(),
    makePrismaPatientRepository(),
    makePrismaDoctorRepoistory(),
  );
};
