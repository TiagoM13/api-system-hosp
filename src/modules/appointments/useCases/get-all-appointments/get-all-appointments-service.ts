import { AppointmentType } from '@prisma/client';

import { IAppointment, IPaginateRequest } from '@shared/entities';
import { AppointmentRepository } from '@shared/repositories/implementations/appointment-repository';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

type IGetAllAppointmentsParams = IPaginateRequest & {
  end_date?: Date;
  start_date?: Date;
  appointment_type?: AppointmentType;
};

export class GetAllAppointmentsService {
  constructor(private readonly appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(
    params: IGetAllAppointmentsParams,
  ): Promise<FindAndCountAll<IAppointment>> {
    const { page, items_per_page } = params;
    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const result = await this.appointmentRepository.findAllAppointments({
      ...params,
      skip: offset,
      take: items_per_page,
    });

    return {
      rows: result.rows,
      count: result.count,
    };
  }
}
