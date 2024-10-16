import { AppError } from '@app/errors/app-client';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { IAppointment } from '@shared/entities';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';

export class CreateAppointmentService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(id: string, data: IAppointment) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

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

    const appointment = await this.appointmentRepository.create(id, data);

    return appointment;
  }
}
