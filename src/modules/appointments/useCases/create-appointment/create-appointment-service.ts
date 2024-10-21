import { AppError } from '@app/errors/app-client';
import { AppointmentDataType } from '@modules/appointments/schemas';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';

export class CreateAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(id: string, data: AppointmentDataType) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment = await this.appointmentRepository.create(id, data);

    return appointment;
  }
}
