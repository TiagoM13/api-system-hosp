export type IAppointment = {
  id?: number;
  appointment_type: string;
  examination?: string | null;
  diagnosis_summary?: string | null;
  scheduled_date: Date;
  created_at?: Date;
  updated_at?: Date;
  patient_id?: string;
  status?: string;
  doctor_id: number;
};
