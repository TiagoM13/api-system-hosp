import { AppError } from '@app/errors/app-client';
import {
  INCONPATIBLE_PASSWORDS,
  USER_NOT_FOUND,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';
import { hashPassword } from '@shared/utils/generate-password';

import { ChangePasswordUserDTO } from './change-password-user-schema';

export class ChangePasswordUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number, dto: ChangePasswordUserDTO): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    const isVerifyPassword = dto.password === dto.confirm_password;

    if (!isVerifyPassword) {
      throw new AppError(INCONPATIBLE_PASSWORDS);
    }

    const hashedPassword = await hashPassword(dto.password);

    return await this.userRepository.changePassword(Number(user.id), {
      ...user,
      password: hashedPassword,
    });
  }
}
