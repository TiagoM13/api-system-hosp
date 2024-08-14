import { PatientRepository } from "@shared/repositories";
import { GetPatientService } from "./get-patient-service";
import { GetPatientController } from "./get-patient-controller";

export function getPatientFactory() {
    const repository = new PatientRepository()
    const service = new GetPatientService(repository)
    const controller = new GetPatientController(service)

    return controller;
}

export default getPatientFactory;
