import { PatientRepository } from "@shared/repositories/implementations";
import { CreatePatientService } from "./create-patient-service";
import { CreatePatientController } from "./create-patient-controller";

export function createPatientFactory() {
  const repository = new PatientRepository()
  const service = new CreatePatientService(repository)
  const controller = new CreatePatientController(service)

  return controller;
}

export default createPatientFactory;
