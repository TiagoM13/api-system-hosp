import { AppointmentStatus, AppointmentType, Status } from '@prisma/client';

export interface FindEntitiesAndCountParams {
  name?: string;
  take: number;
  skip: number;
}

export interface FindEntitiesAndCountResult<T> {
  count: number;
  rows: T[];
}

export interface FindAppointmentsAndCountParams
  extends Omit<FindEntitiesAndCountParams, 'name'> {
  patient_id: string;
  scheduled_date?: Date;
  appointment_type?: AppointmentType;
  status?: AppointmentStatus;
}

export interface FindAllAppointmentsAndCountParams
  extends FindEntitiesAndCountParams {
  scheduled_date?: Date;
  appointment_type?: AppointmentType;
  status?: AppointmentStatus;
}

export interface FindAllPatientsAndCountParams
  extends FindEntitiesAndCountParams {
  cpf?: string;
  cns?: string;
  status?: Status;
}
