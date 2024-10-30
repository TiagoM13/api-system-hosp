import { AppError } from '@app/errors/app-client';
import { CNS_EXISTS, CPF_EXISTS } from '@shared/constants/messages';
import { IPatient } from '@shared/entities';
import { PatientRepository } from '@shared/repositories/implementations';

import { CreatePatientDTO } from './create-patient-schema';

export class CreatePatientService {
  constructor(private patientRepository: PatientRepository) {
    this.patientRepository = patientRepository;
  }

  async execute(dto: CreatePatientDTO): Promise<IPatient> {
    if (dto.cpf) {
      const existingCPF = await this.patientRepository.findByCPF(dto.cpf);
      if (existingCPF) {
        throw new AppError(CPF_EXISTS);
      }
    }

    if (dto.cns) {
      const existingCNS = await this.patientRepository.findByCNS(dto.cns);
      if (existingCNS) {
        throw new AppError(CNS_EXISTS);
      }
    }

    const patient = await this.patientRepository.create(dto);

    return patient;
  }
}
