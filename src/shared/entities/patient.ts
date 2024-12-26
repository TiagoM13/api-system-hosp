import { MaritalStatus, Sex, Status } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { IPaginateRequest } from './paginate';

export type IPatient = {
  id?: string;
  name: string;
  birth_date: Date;
  sex: Sex;
  cpf?: string | null;
  cns?: string | null;
  address?: string | null;
  mother_name?: string | null;
  father_name?: string | null;
  marital_status?: MaritalStatus | null;
  occupation?: string | null;
  email?: string | null;
  phone?: string | null;
  contact_emergency?: string | null;
  name_contact_emergency?: string | null;
  health_agent?: string | null;
  height?: number | Decimal | null;
  weight?: number | Decimal | null;
  status?: Status;

  created_at?: Date;
  updated_at?: Date;
  // TO-DO
  // conditions: []
};

export interface IPatientFilters extends IPaginateRequest {
  cpf?: string;
  cns?: string;
  status?: Status;
}
