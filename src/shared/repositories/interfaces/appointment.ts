import {
  type FindEntitiesAndCountResult,
  type FindAppointmentsAndCountParams,
  IAppointment,
} from '@shared/entities';

export interface IAppointmentRepository {
  findAll(
    patientId: string,
    skip: number,
    take: number,
    appointment_type?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<IAppointment[]>;
  findById(appointment_id: number): Promise<IAppointment | null>;
  create(patient_id: string, data: IAppointment): Promise<IAppointment>;
  update(
    appointment_id: number,
    data: IAppointment,
  ): Promise<IAppointment | null>;
  findAndCountAll(
    params: FindAppointmentsAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IAppointment>>;
}
