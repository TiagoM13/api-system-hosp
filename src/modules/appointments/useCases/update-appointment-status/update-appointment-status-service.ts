import { AppointmentStatus } from '@prisma/client';

import { AppError } from '@app/errors/app-client';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import {
  APPOINTMENT_NOT_FOUND,
  APPOINTMENT_STATUS_CANNOT_BE_CHANGED,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';

import { UpdateAppointmentStatusDTO } from './update-appointment-status-schema';

export class UpdateAppointmentStatusService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(
    appointmentId: string,
    patientId: string,
    dto: UpdateAppointmentStatusDTO,
  ): Promise<AppointmentStatus> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    if (
      appointment.status === AppointmentStatus.CANCELLED ||
      appointment.status === AppointmentStatus.COMPLETED
    ) {
      throw new AppError(APPOINTMENT_STATUS_CANNOT_BE_CHANGED);
    }

    if (appointment.status === dto.status) {
      return appointment.status;
    }

    const updatedAppointmentStatus =
      await this.appointmentRepository.updateAppointmentStatus(
        appointmentId,
        dto.status,
      );

    return updatedAppointmentStatus;
  }
}
