import { IPatient } from '../../entities';

export interface IPatientRepository {
  findAll(
    search: string | undefined,
    skip: number,
    take: number,
  ): Promise<IPatient[]>;
  findById(id: string): Promise<IPatient | null>;
  findByCPF(cpf: string): Promise<IPatient | null>;
  findByCNS(cns: string): Promise<IPatient | null>;
  findFirstByCPF(id: string, cpf: string): Promise<IPatient | null>;
  findFirstByCNS(id: string, cpf: string): Promise<IPatient | null>;
  count(search: string | undefined): Promise<number>;
  create(data: IPatient): Promise<IPatient>;
  update(id: string, data: IPatient): Promise<IPatient>;
}
