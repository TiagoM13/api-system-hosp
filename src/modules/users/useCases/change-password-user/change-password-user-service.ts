import { AppError } from '@app/errors/app-client';
import {
  INCONPATIBLE_PASSWORDS,
  USER_NOT_FOUND,
} from '@shared/constants/messages';
import { UserRepository } from '@shared/repositories/implementations';
import { hashPassword } from '@shared/utils/generate-password';

export class ChangePasswordUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number, password: string, confirm_password: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    const isVerifyPassword = password === confirm_password;

    if (!isVerifyPassword) {
      throw new AppError(INCONPATIBLE_PASSWORDS);
    }

    const hashedPassword = await hashPassword(password);

    await this.userRepository.changePassword(user.id!, {
      ...user,
      password: hashedPassword,
    });
  }
}
