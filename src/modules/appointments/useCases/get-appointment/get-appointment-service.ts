import { AppError } from '@app/errors/app-client';
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
      throw new AppError('Patient not found.');
    }

    const appointment = await this.appointmentRepository.findById(queryId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError('Query not found.');
    }

    return appointment;
  }
}
