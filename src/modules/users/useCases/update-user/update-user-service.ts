import { AppError } from '@app/errors/app-client';
import {
  EMAIL_CANNOT_BE_CHANGED,
  EMAIL_IS_ALREADY_IN_USE,
  ROLE_CANNOT_BE_CHANGED,
  USER_NOT_FOUND,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';

import { UpdateUserDTO } from './update-user-schema';

export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    id: number,
    dto: UpdateUserDTO,
    loggedInUser: IUser,
  ): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    if (dto.email && dto.email !== user.email) {
      throw new AppError(EMAIL_CANNOT_BE_CHANGED);
    }

    if (dto.email) {
      const emailInUse = await this.userRepository.findByEmail(dto.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new AppError(EMAIL_IS_ALREADY_IN_USE);
      }
    }

    if (dto.role && dto.role !== user.role) {
      if (loggedInUser.id === id) {
        throw new AppError(ROLE_CANNOT_BE_CHANGED);
      }
    }

    const updateUser = await this.userRepository.update(id, dto);

    return updateUser;
  }
}
