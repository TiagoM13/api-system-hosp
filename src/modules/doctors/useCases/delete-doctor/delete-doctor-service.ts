import { AppError } from '@app/errors/app-client';
import { DOCTOR_NOT_FOUND } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';
import { DoctorRepository } from '@shared/repositories/implementations/doctor-repository';

export class DeleteDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(id: number): Promise<IDoctor> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    const deleteDoctor = await this.doctorRepository.delete(id);

    return deleteDoctor;
  }
}
