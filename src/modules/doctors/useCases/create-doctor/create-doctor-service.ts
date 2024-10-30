import { AppError } from '@app/errors/app-client';
import { CNS_EXISTS } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

import { CreateDoctorDTO } from './create-doctor-schema';

export class CreateDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(dto: CreateDoctorDTO): Promise<IDoctor> {
    const conflictingDoctor = await this.doctorRepository.findByEmailOrCrm(
      dto.email as string,
      dto.crm,
    );

    if (conflictingDoctor) {
      throw new AppError(
        `Já existe um médico cadastrado com este ${conflictingDoctor.email === dto.email ? 'email' : 'crm'}.`,
      );
    }

    if (dto.cns) {
      const conflictingCNSDoctor = await this.doctorRepository.findByCNS(
        dto.cns,
      );
      if (conflictingCNSDoctor) {
        throw new AppError(CNS_EXISTS);
      }
    }

    const doctor = await this.doctorRepository.create(dto);

    return doctor;
  }
}
