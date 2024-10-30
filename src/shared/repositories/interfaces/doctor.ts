import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IDoctor,
} from '@shared/entities';
import { Status } from '@shared/enums';

export interface IDoctorRepository {
  findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IDoctor>>;
  findById(id: number): Promise<IDoctor | null>;
  findByEmailOrCrm(email: string, crm: string): Promise<IDoctor | null>;
  findByCNS(cns: string): Promise<IDoctor | null>;
  create(dto: IDoctor): Promise<IDoctor>;
  update(id: number, dto: Partial<IDoctor>): Promise<IDoctor>;
  updateStatus(id: number, status: Status): Promise<IDoctor>;
  delete(id: number): Promise<IDoctor>;
}
