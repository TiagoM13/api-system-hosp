import { AppError } from '@app/errors/app-client';

import {
  EMAIL_CANNOT_BE_CHANGED,
  EMAIL_IS_ALREADY_IN_USE,
  ROLE_CANNOT_BE_CHANGED,
  USER_NOT_FOUND,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';

export class UpdateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number, data: IUser) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    if (data.email && data.email !== user.email) {
      throw new AppError(EMAIL_CANNOT_BE_CHANGED);
    }

    if (data.email) {
      const emailInUse = await this.userRepository.findByEmail(data.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new AppError(EMAIL_IS_ALREADY_IN_USE);
      }
    }

    if (data.role && data.role !== user.role) {
      throw new AppError(ROLE_CANNOT_BE_CHANGED);
    }

    const updateUser = await this.userRepository.update(id, data);

    return updateUser;
  }
}
