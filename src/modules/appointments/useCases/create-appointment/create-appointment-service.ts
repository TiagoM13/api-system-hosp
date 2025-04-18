import { Status } from '@prisma/client';

import { AppError } from '@app/errors/app-client';
import { prisma } from '@app/infra/prisma/client';
import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { DoctorRepository } from '@modules/doctors/repositories/doctor-repository';
import { PatientRepository } from '@modules/patients/repositories/patient-repository';
import {
  DOCTOR_INACTIVE,
  DOCTOR_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';

import { CreateAppointmentDTO } from './create-appointment-schema';

export class CreateAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(patientId: string, dto: CreateAppointmentDTO) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const doctor = await this.doctorRepository.findById(dto.doctor_id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    if (doctor.status === Status.INACTIVE) {
      throw new AppError(DOCTOR_INACTIVE);
    }

    if (patient.status === Status.INACTIVE) {
      await prisma.patient.update({
        where: { id: patientId },
        data: { status: Status.ACTIVE },
      });
    }

    const appointment = await this.appointmentRepository.create(patientId, dto);

    return appointment;
  }
}
