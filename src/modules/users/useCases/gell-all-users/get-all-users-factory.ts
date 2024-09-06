import { UserRepository } from "@shared/repositories/implementations";
import { GetAllUsersController } from "./get-all-users-controller";
import { GetAllUsersService } from "./get-all-users-service";

export function getAllUsersFactory() {
  const repository = new UserRepository();
  const service = new GetAllUsersService(repository);
  const controller = new GetAllUsersController(service);

  return controller;
}

export default getAllUsersFactory;
