import { UserRepository } from "@shared/repositories";
import { ForgotPasswordService } from "./forgot-password-service";
import { ForgotPasswordController } from "./forgot-password-controller";

export function forgotPasswordFactory() {
    const repository = new UserRepository()
    const service = new ForgotPasswordService(repository)
    const controller = new ForgotPasswordController(service)

    return controller
}

export default forgotPasswordFactory;