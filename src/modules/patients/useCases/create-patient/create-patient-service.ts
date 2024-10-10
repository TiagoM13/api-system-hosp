import { AppError } from '@app/errors/app-client';
import { CNS_EXISTS, CPF_EXISTS } from '@shared/constants/messages';
import { IPatient } from '@shared/entities';
import { PatientRepository } from '@shared/repositories/implementations';

import { PatientDataType } from '../../schemas/body';

export class CreatePatientService {
  constructor(private patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(data: PatientDataType): Promise<IPatient> {
    const { cpf, cns } = data;

    if (cpf) {
      const existingCPF = await this.patientRepository.findByCPF(cpf);
      if (existingCPF) {
        throw new AppError(CPF_EXISTS);
      }
    }

    if (cns) {
      const existingCNS = await this.patientRepository.findByCNS(cns);
      if (existingCNS) {
        throw new AppError(CNS_EXISTS);
      }
    }

    const patient = await this.patientRepository.create(data);

    return patient;
  }
}
