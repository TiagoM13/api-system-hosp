import { AppError } from '@app/errors/app-client';
import {
  APPOINTMENT_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';
import { IAppointment } from '@shared/entities';
import { AppointmentStatus } from '@shared/enums';
import {
  AppointmentRepository,
  PatientRepository,
} from '@shared/repositories/implementations';

import { UpdateAppointmentStatusType } from './update-appointment-status-schema';

export class UpdateAppointmentStatusService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(
    appointmentId: number,
    patientId: string,
    dto: UpdateAppointmentStatusType,
  ): Promise<IAppointment> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    if (
      appointment.status === AppointmentStatus.CANCELLED ||
      appointment.status === AppointmentStatus.COMPLETED
    ) {
      throw new AppError(
        'Não é possível alterar o status de uma consulta que já foi cancelada ou concluída.',
      );
    }

    if (appointment.status === dto.status) {
      return appointment;
    }

    const updatedAppointmentStatus =
      await this.appointmentRepository.updateAppointmentStatus(
        appointmentId,
        dto.status,
      );

    return updatedAppointmentStatus;
  }
}
