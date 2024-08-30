import { AppError } from "@app/errors";
import { UserRepository } from "@shared/repositories";

export class ForgotPasswordService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("User not found.", 404)
        }

        return user
    }
}