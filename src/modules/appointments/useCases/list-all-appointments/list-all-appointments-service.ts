import { IAppointment, IPaginateRequest } from '@shared/entities';
import { AppointmentRepository } from '@shared/repositories/implementations/appointment-repository';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

type IListAllAppointmentsParams = IPaginateRequest & {
  end_date?: Date;
  start_date?: Date;
  appointment_type?: string;
};

export class ListAllAppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute({
    page,
    items_per_page,
    appointment_type,
    end_date,
    start_date,
  }: IListAllAppointmentsParams): Promise<FindAndCountAll<IAppointment>> {
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const result = await this.appointmentRepository.findAllAppointments({
      skip: offset,
      take: items_per_page,
      appointment_type,
      startDate: start_date,
      endDate: end_date,
    });

    return {
      rows: result.rows,
      count: result.count,
    };
  }
}
