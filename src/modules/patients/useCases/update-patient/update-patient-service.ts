import { AppError } from '@app/errors/app-client';
import {
  CNS_EXISTS,
  CPF_EXISTS,
  INVALID_BIRTH_DATE,
} from '@shared/constants/messages';
import { PatientRepository } from '@shared/repositories/implementations';

import { PatientDataType } from '../../schemas/body';

export class UpdatePatientService {
  private patientRepository: PatientRepository;

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(id: string, data: PatientDataType) {
    const patient = await this.patientRepository.findById(id);

    if (!patient) {
      throw new AppError('Pacient not found.');
    }

    const { birth_date, cpf, cns } = data;

    if (birth_date >= new Date()) {
      throw new AppError(INVALID_BIRTH_DATE);
    }

    if (cpf) {
      const existingCpf = await this.patientRepository.findFirstByCPF(cpf, id);

      if (existingCpf) {
        throw new AppError(CPF_EXISTS);
      }
    }

    if (cns) {
      const existingCNS = await this.patientRepository.findFirstByCNS(cns, id);

      if (existingCNS) {
        throw new AppError(CNS_EXISTS);
      }
    }

    const updatePatient = await this.patientRepository.update(id, data);

    return updatePatient;
  }
}
