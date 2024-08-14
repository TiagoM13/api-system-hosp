import { UserRepository } from "@shared/repositories";
import { LoginService } from "./login-service";
import { LoginController } from "./login-controller";

export function loginFactory() {
    const repository = new UserRepository()
    const service = new LoginService(repository)
    const controller = new LoginController(service)

    return controller
}

export default loginFactory;