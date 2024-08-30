import { IUser } from "@shared/entities";
import { AppError } from "@app/errors";
import { UserRepository } from "@shared/repositories";

export class UpdateUserService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: number, data: IUser) {
        const user = await this.userRepository.findById(id)

        if (!user) {
            throw new AppError("User not found.", 404)
        }

        if (data.email && data.email !== user.email) {
            throw new AppError("Email address cannot be changed.");
        }

        if (data.email) {
            const emailInUse = await this.userRepository.findByEmail(data.email);
            if (emailInUse && emailInUse.id !== id) {
                throw new AppError("This email is already in use by another user.")
            }
        }

        const updateUser = await this.userRepository.update(id, data);

        return updateUser
    }
}