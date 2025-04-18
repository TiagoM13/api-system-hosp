import { AppError } from '@app/errors/app-client';
import { DoctorRepository } from '@modules/doctors/repositories/doctor-repository';
import { DOCTOR_NOT_FOUND } from '@shared/constants/messages';
import { IDoctor } from '@shared/entities';

export class GetDoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(id: string): Promise<IDoctor | null> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    return doctor;
  }
}
