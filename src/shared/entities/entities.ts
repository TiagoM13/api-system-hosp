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
  patientId: string;
  appointmentType?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface FindAllAppointmentsAndCountParams
  extends FindEntitiesAndCountParams {
  appointmentType?: string;
  startDate?: Date;
  endDate?: Date;
}
