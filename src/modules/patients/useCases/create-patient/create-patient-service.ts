import { AppError } from '@app/errors/app-client';
import {
  CNS_EXISTS,
  CPF_EXISTS,
  INVALID_BIRTH_DATE,
} from '@shared/constants/messages';
import { PatientRepository } from '@shared/repositories/implementations';

import { PatientDataType } from '../../schemas/body';

export class CreatePatientService {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(data: PatientDataType) {
    const { birth_date, cpf, cns } = data;

    if (birth_date >= new Date()) {
      throw new AppError(INVALID_BIRTH_DATE);
    }

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
