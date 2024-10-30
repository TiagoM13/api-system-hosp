import { AppError } from '@app/errors/app-client';
import { CNS_EXISTS, DOCTOR_NOT_FOUND } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

import { UpdateDoctorDTO } from './update-doctor-schema';

export class UpdateDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(id: number, dto: UpdateDoctorDTO): Promise<IDoctor> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    if (dto.crm) {
      const conflictingDoctor = await this.doctorRepository.findByEmailOrCrm(
        dto.email as string,
        dto.crm,
      );

      if (conflictingDoctor && conflictingDoctor.id !== doctor.id) {
        throw new AppError(
          `Já existe um médico cadastrado com este ${conflictingDoctor.email === dto.email ? 'email' : 'crm'}.`,
        );
      }
    }

    if (dto.cns) {
      const conflictingCNSDoctor = await this.doctorRepository.findByCNS(
        dto.cns,
      );

      if (conflictingCNSDoctor && conflictingCNSDoctor.id !== doctor.id)
        throw new AppError(CNS_EXISTS);
    }

    const updatedDoctor = await this.doctorRepository.update(id, dto);

    return updatedDoctor;
  }
}
