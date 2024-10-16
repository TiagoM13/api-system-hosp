import { AppError } from '@app/errors/app-client';
import {
  APPOINTMENT_NOT_FOUND,
  PATIENT_NOT_FOUND,
} from '@shared/constants/messages';
import { IAppointment } from '@shared/entities';
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

  async execute(appointmentId: number, patientId: string, data: IAppointment) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (patientId !== appointment?.patient_id) {
      throw new AppError(APPOINTMENT_NOT_FOUND, 404);
    }

    // Validate Scheduled date
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const scheduledDate = data.scheduled_date
      ? new Date(data.scheduled_date)
      : now;

    if (scheduledDate > now) {
      throw new AppError(
        'Data inválida: A data não pode ser maior que a data atual',
      );
    }

    if (scheduledDate < threeMonthsAgo) {
      throw new AppError(
        'Data inválida: A data não pode ser menor que 3 meses atrás',
      );
    }

    const updatedAppointment = await this.appointmentRepository.update(
      appointmentId,
      data,
    );

    return updatedAppointment;
  }
}
