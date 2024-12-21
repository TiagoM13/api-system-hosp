import { AppointmentStatus } from '@prisma/client';

import {
  type FindEntitiesAndCountResult,
  type FindAppointmentsAndCountParams,
  type FindAllAppointmentsAndCountParams,
  IAppointment,
} from '@shared/entities';

export interface IAppointmentRepository {
  findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findAllAppointments(
    params: FindAllAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findById(appointment_id: number): Promise<IAppointment | null>;
  create(patient_id: string, dto: IAppointment): Promise<IAppointment>;
  update(
    appointment_id: number,
    dto: Partial<IAppointment>,
  ): Promise<IAppointment | null>;
  updateAppointmentStatus(
    appointment_id: number,
    status: AppointmentStatus,
  ): Promise<string>;
}
