import { UserRepository } from "@shared/repositories";
import { DeleteUserService } from "./delete-user-service";
import { DeleteUserController } from "./delete-user-controller";

export function deleteUserFactory() {
    const repository = new UserRepository();
    const service = new DeleteUserService(repository);
    const controller = new DeleteUserController(service);

    return controller;
}

export default deleteUserFactory;