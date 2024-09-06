import { AppError } from "@app/errors/app-client";
import { IPatient } from "@shared/entities";
import { PatientRepository } from "@shared/repositories/implementations";

export class CreatePatientService {
  private patientRepository: PatientRepository

  constructor(patientRepository: PatientRepository) {
    this.patientRepository = patientRepository
  }

  async execute(data: IPatient) {
    const { birth_date, cpf, cnes } = data

    if (birth_date >= new Date()) {
      throw new AppError("Invalid birth of date.")
    }

    if (cpf) {
      const existingCpf = await this.patientRepository.findByCPF(cpf)
      if (existingCpf) {
        throw new AppError("CPF already exists.")
      }
    }

    if (cnes) {
      const existingCNES = await this.patientRepository.findByCNES(cnes)
      if (existingCNES) {
        throw new AppError("CNES already exists.")
      }
    }

    const patient = await this.patientRepository.create(data)

    return patient;
  }
}
