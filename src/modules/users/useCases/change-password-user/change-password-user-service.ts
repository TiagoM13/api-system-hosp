import { AppError } from "@app/errors";
import { UserRepository } from "@shared/repositories";
import { hashPassword } from "@shared/utils";

export class ChangePasswordUserService {
    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: number, password: string, confirmPassword: string) {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new AppError("User not found.")
        }

        const isVerifyPassword = password === confirmPassword;

        if (!isVerifyPassword) {
            throw new AppError("Confirm that the passwords are the same.")
        }

        const hashedPassword = await hashPassword(password);

        const changePassword = await this.userRepository.changePassword(user.id!, {
            ...user,
            password: hashedPassword
        })

        return changePassword
    }
}