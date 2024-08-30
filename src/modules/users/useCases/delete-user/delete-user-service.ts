import { AppError } from "@app/errors";
import { UserRepository } from "@shared/repositories";

export class DeleteUserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: number) {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new AppError("User not found.", 404)
        }

        const deleteUser = await this.userRepository.delete(id)

        return deleteUser
    }
}