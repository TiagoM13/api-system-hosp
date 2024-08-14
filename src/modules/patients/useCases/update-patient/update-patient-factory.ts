import { PatientRepository } from "@shared/repositories";
import { UpdatePatientService } from "./update-patient-service";
import { UpdatePatientController } from "./update-patient-controller";

export function updatePatientFactory() {
    const repository = new PatientRepository()
    const service = new UpdatePatientService(repository)
    const controller = new UpdatePatientController(service)

    return controller;
}

export default updatePatientFactory;
