import { AppError } from '@app/errors/app-client';
import {
  CNS_EXISTS,
  CPF_EXISTS,
  PATIENT_NOT_FOUND,
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
      throw new AppError(PATIENT_NOT_FOUND);
    }

    const { cpf, cns } = data;

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
