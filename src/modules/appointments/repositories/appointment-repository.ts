import { AppointmentStatus } from '@prisma/client';

import {
  type FindEntitiesAndCountResult,
  type FindAppointmentsAndCountParams,
  type FindAllAppointmentsAndCountParams,
  IAppointment,
} from '@shared/entities';

export interface AppointmentRepository {
  findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findAllAppointments(
    params: FindAllAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findById(appointment_id: string): Promise<IAppointment | null>;
  create(patient_id: string, dto: IAppointment): Promise<IAppointment>;
  update(
    appointment_id: string,
    dto: Partial<IAppointment>,
  ): Promise<IAppointment | null>;
  updateAppointmentStatus(
    appointment_id: string,
    status: AppointmentStatus,
  ): Promise<AppointmentStatus>;
}
