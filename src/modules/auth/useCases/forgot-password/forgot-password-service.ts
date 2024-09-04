import { AppError } from "@app/errors";

import { USER_INACTIVE, USER_NOT_FOUND } from "@shared/constants";
import { generateProvisionalPassword, hashPassword } from "@shared/utils";
import { UserRepository } from "@shared/repositories";

export class ForgotPasswordService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError(USER_NOT_FOUND, 404)
        }

        if (user.status === "inativo") {
            throw new AppError(USER_INACTIVE, 403)
        }

        const provisionalPassword = generateProvisionalPassword();
        const hashedPassword = await hashPassword(provisionalPassword);

        await this.userRepository.update(user.id!, { ...user, password: hashedPassword })

        // Aqui chamar a função de envio de e-mail no futuro
        // await sendPasswordResetEmail(user.email, provisionalPassword);
    }
}