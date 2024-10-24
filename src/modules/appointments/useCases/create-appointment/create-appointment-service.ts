import { AppError } from '@app/errors/app-client';
import { AppointmentDataType } from '@modules/appointments/schemas';
import {
  DOCTOR_INACTIVE,
  DOCTOR_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';
import { Status } from '@shared/enums';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

export class CreateAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(id: string, data: AppointmentDataType) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const doctor = await this.doctorRepository.findById(data.doctor_id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    if (doctor.status === Status.INACTIVE) {
      throw new AppError(DOCTOR_INACTIVE);
    }

    const appointment = await this.appointmentRepository.create(id, data);

    return appointment;
  }
}
