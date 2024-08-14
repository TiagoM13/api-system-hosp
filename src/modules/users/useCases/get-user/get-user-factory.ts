import { UserRepository } from "@shared/repositories";
import { GetUserService } from "./get-user-service";
import { GetUserController } from "./get-user-controller";

export function getUserFactory() {
    const repository = new UserRepository()
    const service = new GetUserService(repository)
    const controller = new GetUserController(service)

    return controller  
}

export default getUserFactory;