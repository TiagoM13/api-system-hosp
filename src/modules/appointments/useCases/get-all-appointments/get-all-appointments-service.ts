import { AppointmentStatus, AppointmentType } from '@prisma/client';

import { AppointmentRepository } from '@modules/appointments/repositories/appointment-repository';
import { IAppointment, IPaginateRequest } from '@shared/entities';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

type IGetAllAppointmentsParams = IPaginateRequest & {
  scheduled_date?: Date;
  appointment_type?: AppointmentType;
  status?: AppointmentStatus;
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
