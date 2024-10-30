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
  appointment_type?: string;
  start_date?: Date;
  end_date?: Date;
}

export interface FindAllAppointmentsAndCountParams
  extends FindEntitiesAndCountParams {
  appointment_type?: string;
  start_date?: Date;
  end_date?: Date;
}
