import { Sex, Status } from '@prisma/client';

export type IDoctor = {
  id?: number;
  name: string;
  sex: Sex;
  birth_date: Date;
  crm: string;
  phone?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  specialty: string;
  appointment_id?: string | null;
  working_days: number[];
  status?: Status;

  created_at?: Date;
  updated_at?: Date;
};
