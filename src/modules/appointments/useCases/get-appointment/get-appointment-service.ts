import { AppError } from '@app/errors/app-client';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import {
  APPOINTMENT_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';

export class GetAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(appointmentId: number, patientId: string) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    return appointment;
  }
}
