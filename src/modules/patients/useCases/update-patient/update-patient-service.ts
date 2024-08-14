import { AppError } from "@app/errors";
import { IPatient } from "@shared/entities";
import { PatientRepository } from "@shared/repositories";

export class UpdatePatientService {
    private patientRepository: PatientRepository

    constructor(patientRepository: PatientRepository) {
        this.patientRepository = patientRepository
    }

    async execute(id: string, data: IPatient) {
        const patient = await this.patientRepository.findById(id)

        if (!patient) {
            throw new AppError('Pacient not found.')
        }

        const { birth_date, cpf, cnes } = data

        if (birth_date >= new Date()) {
            throw new AppError("Invalid birth of date.")
        }

        if (cpf) {
            const existingCpf = await this.patientRepository.findFirstByCPF(cpf, id)

            if (existingCpf) {
                throw new AppError("CPF already exists.")
            }
        }

        if (cnes) {
            const existingCNES = await this.patientRepository.findFirstByCNES(cnes, id)

            if (existingCNES) {
                throw new AppError("CNES already exists.")
            }
        }

        const updatePatient = await this.patientRepository.update(id, data)

        return updatePatient;
    }
}