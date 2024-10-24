import { AppError } from '@app/errors/app-client';
import { DoctorDataType } from '@modules/doctors/schemas';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

export class CreateDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(data: DoctorDataType): Promise<IDoctor> {
    const existingData = await this.doctorRepository.findByEmailOrCrm(
      data.email,
      data.crm,
    );

    if (existingData) {
      throw new AppError(
        `Já existe um médico cadastrado com este ${existingData.email === data.email ? 'email' : 'crm'}.`,
      );
    }

    const doctor = await this.doctorRepository.create(data);

    return doctor;
  }
}
