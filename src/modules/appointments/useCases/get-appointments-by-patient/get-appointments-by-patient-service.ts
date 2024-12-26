import { AppointmentType } from '@prisma/client';

import { AppError } from '@app/errors/app-client';
import { PATIENT_NOT_FOUND } from '@shared/constants/messages';
import { IAppointment, IPaginateRequest } from '@shared/entities';
import {
  PatientRepository,
  AppointmentRepository,
} from '@shared/repositories/implementations';
import { validatePaginationParams } from '@shared/utils';
import { FindAndCountAll } from '@shared/utils/format-paginate';

type IGetAppointmentsByPatientParams = Omit<IPaginateRequest, 'name'> & {
  patient_id: string;
  end_date?: Date;
  start_date?: Date;
  appointment_type?: AppointmentType;
};

export class GetAppointmentsByPatientService {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly patientRepository: PatientRepository,
  ) {
    this.appointmentRepository = appointmentRepository;
    this.patientRepository = patientRepository;
  }

  async execute(
    params: IGetAppointmentsByPatientParams,
  ): Promise<FindAndCountAll<IAppointment>> {
    const { patient_id, page, items_per_page } = params;
    const patient = await this.patientRepository.findById(patient_id);

    if (!patient) {
      throw new AppError(PATIENT_NOT_FOUND, 404);
    }

    validatePaginationParams(page, items_per_page);

    const offset = (page - 1) * items_per_page;
    const appointments = await this.appointmentRepository.findAndCountAll({
      ...params,
      skip: offset,
      take: items_per_page,
    });

    return appointments;
  }
}
