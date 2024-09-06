import { PatientRepository } from "@shared/repositories/implementations";
import { GetAllPatientsService } from "./get-all-patients-service";
import { GetAllPatientsController } from "./get-all-patients-controller";

export function getAllPatientsFactory() {
  const repository = new PatientRepository()
  const service = new GetAllPatientsService(repository)
  const controller = new GetAllPatientsController(service)

  return controller;
}

export default getAllPatientsFactory;
