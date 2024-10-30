import { AppError } from '@app/errors/app-client';
import { DOCTOR_NOT_FOUND } from '@shared/constants/messages';
import { DoctorRepository } from '@shared/repositories/implementations';

import { UpdateDoctorStatusDTO } from './update-doctor-status-schema';

export class UpdateDoctorStatusService {
  constructor(private readonly doctorRepository: DoctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async execute(id: number, dto: UpdateDoctorStatusDTO): Promise<string> {
    const doctor = await this.doctorRepository.findById(id);

    if (!doctor) {
      throw new AppError(DOCTOR_NOT_FOUND, 404);
    }

    const status = await this.doctorRepository.updateStatus(id, dto.status);

    return status;
  }
}
