import { AppError } from '@app/errors/app-client';
import { DoctorDataType } from '@modules/doctors/schemas';
import { DOCTOR_NOT_FOUND } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

export class UpdateDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(id: number, data: DoctorDataType): Promise<IDoctor> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    const existingData = await this.doctorRepository.findByEmailOrCrm(
      data.email,
      data.crm,
    );

    if (existingData) {
      throw new AppError(
        `Já existe um médico cadastrado com este ${existingData.email === data.email ? 'email' : 'crm'}.`,
      );
    }

    const updatedDoctor = await this.doctorRepository.update(id, data);

    return updatedDoctor;
  }
}
