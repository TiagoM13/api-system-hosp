export interface FindEntitiesAndCountParams {
  name: string | undefined;
  take: number;
  skip: number;
}

export interface FindEntitiesAndCountResult<T> {
  count: number;
  rows: T[];
}

export interface FindAppointmentsAndCountParams {
  patientId: string;
  skip: number;
  take: number;
  appointment_type?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface FindAllAppointmentsAndCountParams {
  skip: number;
  take: number;
  appointment_type?: string;
  startDate?: Date;
  endDate?: Date;
}
