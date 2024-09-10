export type IQuery = {
  id?: number;
  public_id?: string;
  type_query: string; // TypeQuery enum
  exam?: string | null;
  diagnosis?: string | null;
  created_at?: Date;
  updated_at?: Date;
  patient_id: string;
};
