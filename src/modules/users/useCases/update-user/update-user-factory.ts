import { UserRepository } from "@shared/repositories";
import { UpdateUserService } from "./update-user-service";
import { UpdateUserController } from "./update-user-controller";

export function updateUserFactory() {
    const repository = new UserRepository()
    const service = new UpdateUserService(repository)
    const controller = new UpdateUserController(service)

    return controller  
}

export default updateUserFactory;