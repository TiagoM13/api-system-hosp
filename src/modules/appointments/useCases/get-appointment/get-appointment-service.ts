import { AppError } from '@app/errors/app-client';
import {
  APPOINTMENT_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';

export class GetAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(queryId: number, patientId: string) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment = await this.appointmentRepository.findById(queryId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    return appointment;
  }
}
