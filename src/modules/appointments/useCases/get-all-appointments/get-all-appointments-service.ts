import { AppError } from '@app/errors/app-client';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { IAppointment, IPaginateRequest } from '@shared/entities';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

type IGetAllAppointmentsParams = IPaginateRequest & {
  patient_id: string;
  end_date?: Date;
  start_date?: Date;
  appointment_type?: string;
};

export class GetAllAppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute({
    patient_id,
    page,
    items_per_page,
    appointment_type,
    start_date,
    end_date,
  }: IGetAllAppointmentsParams): Promise<FindAndCountAll<IAppointment>> {
    const patient = await this.patientRepository.findById(patient_id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;

    // Adiciona logs para depuração
    console.log('Start Date:', start_date);
    console.log('End Date:', end_date);

    const appointments = await this.appointmentRepository.findAndCountAll({
      patientId: patient_id,
      skip: offset,
      take: items_per_page,
      appointment_type,
      startDate: start_date,
      endDate: end_date,
    });

    return appointments;
  }
}
