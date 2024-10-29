import {
  type FindEntitiesAndCountParams,
  type FindEntitiesAndCountResult,
  IPatient,
} from '@shared/entities';

export interface IPatientRepository {
  findAndCountAll(
    params: FindEntitiesAndCountParams,
  ): Promise<FindEntitiesAndCountResult<IPatient>>;
  findById(id: string): Promise<IPatient | null>;
  findByCPF(cpf: string): Promise<IPatient | null>;
  findByCNS(cns: string): Promise<IPatient | null>;
  findFirstByCPF(id: string, cpf: string): Promise<IPatient | null>;
  findFirstByCNS(id: string, cpf: string): Promise<IPatient | null>;
  create(data: IPatient): Promise<IPatient>;
  update(id: string, data: IPatient): Promise<IPatient>;
}
