import { UserRepository } from "@shared/repositories/implementations";
import { CreateUserController } from "./create-user-controller";
import { CreateUserService } from "./create-user-service";

export function createUserFactory() {
  const repository = new UserRepository()
  const service = new CreateUserService(repository)
  const controller = new CreateUserController(service)

  return controller
}

export default createUserFactory;
