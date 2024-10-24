import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IDoctor,
} from '@shared/entities';

export interface IDoctorRepository {
  findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IDoctor>>;
  findById(id: number): Promise<IDoctor | null>;
  findByEmailOrCrm(email: string, crm: string): Promise<IDoctor | null>;
  create(data: IDoctor): Promise<IDoctor>;
  update(id: number, data: IDoctor): Promise<IDoctor>;
  delete(id: number): Promise<IDoctor>;
}
