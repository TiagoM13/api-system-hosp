import { AppError } from '@app/errors/app-client';
import { DoctorDataType } from '@modules/doctors/schemas';
import { CNS_EXISTS } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

export class CreateDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(data: DoctorDataType): Promise<IDoctor> {
    const conflictingDoctor = await this.doctorRepository.findByEmailOrCrm(
      data.email as string,
      data.crm,
    );

    if (conflictingDoctor) {
      throw new AppError(
        `Já existe um médico cadastrado com este ${conflictingDoctor.email === data.email ? 'email' : 'crm'}.`,
      );
    }

    if (data.cns) {
      const conflictingCNSDoctor = await this.doctorRepository.findByCNS(
        data.cns,
      );
      if (conflictingCNSDoctor) {
        throw new AppError(CNS_EXISTS);
      }
    }

    const doctor = await this.doctorRepository.create(data);

    return doctor;
  }
}
