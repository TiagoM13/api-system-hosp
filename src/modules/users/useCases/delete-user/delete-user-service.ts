import { AppError } from "@app/errors";
import { USER_NOT_FOUND } from "@shared/constants";
import { UserRepository } from "@shared/repositories";

export class DeleteUserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: number) {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new AppError(USER_NOT_FOUND, 404)
        }

        const deleteUser = await this.userRepository.delete(id)

        return deleteUser
    }
}