import { Status } from '@prisma/client';

import { AppError } from '@app/errors/app-client';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { DoctorRepository } from '@modules/doctors/repositories/doctor-repository';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import {
  APPOINTMENT_NOT_FOUND,
  DOCTOR_INACTIVE,
  DOCTOR_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';

import { UpdateAppointmentDTO } from './update-appointment-schema';

export class UpdateAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(
    appointmentId: number,
    patientId: string,
    dto: UpdateAppointmentDTO,
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

    if (dto.doctor_id) {
      const doctor = await this.doctorRepository.findById(dto.doctor_id);

      if (!doctor) {
        throw new AppError(DOCTOR_NOT_FOUND, 404);
      }

      if (doctor.status === Status.INACTIVE) {
        throw new AppError(DOCTOR_INACTIVE);
      }
    }

    const updatedAppointment = await this.appointmentRepository.update(
      appointmentId,
      dto,
    );

    return updatedAppointment;
  }
}
