import {
  type FindEntitiesAndCountResult,
  type FindAppointmentsAndCountParams,
  type FindAllAppointmentsAndCountParams,
  IAppointment,
} from '@shared/entities';
import { AppointmentStatus } from '@shared/enums';

export interface IAppointmentRepository {
  findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findAllAppointments(
    params: FindAllAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
  findById(appointment_id: number): Promise<IAppointment | null>;
  create(patient_id: string, data: IAppointment): Promise<IAppointment>;
  update(
    appointment_id: number,
    data: IAppointment,
  ): Promise<IAppointment | null>;
  updateAppointmentStatus(
    appointment_id: number,
    status: AppointmentStatus,
  ): Promise<IAppointment>;
}
