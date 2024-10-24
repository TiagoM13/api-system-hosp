import { AppError } from '@app/errors/app-client';
import { DoctorDataType } from '@modules/doctors/schemas';
import { CNS_EXISTS, DOCTOR_NOT_FOUND } from '@shared/constants/messages';
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

    const conflictingDoctor = await this.doctorRepository.findByEmailOrCrm(
      data.email as string,
      data.crm,
    );

    if (conflictingDoctor && conflictingDoctor.id !== doctor.id) {
      throw new AppError(
        `Já existe um médico cadastrado com este ${conflictingDoctor.email === data.email ? 'email' : 'crm'}.`,
      );
    }

    if (data.cns) {
      const conflictingCNSDoctor = await this.doctorRepository.findByCNS(
        data.cns,
      );

      if (conflictingCNSDoctor && conflictingCNSDoctor.id !== doctor.id)
        throw new AppError(CNS_EXISTS);
    }

    const updatedDoctor = await this.doctorRepository.update(id, data);

    return updatedDoctor;
  }
}
