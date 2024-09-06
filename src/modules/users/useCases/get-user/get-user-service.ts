import { AppError } from "@app/errors/app-client";
import { USER_NOT_FOUND } from "@shared/constants/messages";
import { UserRepository } from "@shared/repositories/implementations";

export class GetUserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: number) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404)
    }

    return user
  }
}
