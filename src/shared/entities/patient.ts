import { Decimal } from '@prisma/client/runtime/library';

export type IPatient = {
  id?: string;
  name: string;
  birth_date: Date;
  sex: string;
  cpf?: string | null;
  cns?: string | null;
  address?: string | null;
  mother_name?: string | null;
  father_name?: string | null;
  material_status?: string | null;
  occupation?: string | null;
  email?: string | null;
  phone?: string | null;
  contact_emergency?: string | null;
  name_contact_emergency?: string | null;
  health_agent?: string | null;
  height?: number | Decimal | null;
  weight?: number | Decimal | null;
  status?: string;

  created_at?: Date;
  updated_at?: Date;
  conditions?: ICondition[];
};

export interface ICondition {
  id: number;
  name: string;
}
