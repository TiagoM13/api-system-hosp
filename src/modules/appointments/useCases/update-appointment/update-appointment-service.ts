import { AppError } from '@app/errors/app-client';
import { AppointmentDataType } from '@modules/appointments/schemas';
import {
  APPOINTMENT_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';

export class UpdateAppointmentService {
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
    data: AppointmentDataType,
  ) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    const updatedAppointment = await this.appointmentRepository.update(
      appointmentId,
      data,
    );

    return updatedAppointment;
  }
}
