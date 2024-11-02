import { AppError } from '@app/errors/app-client';
import {
  USER_NOT_FOUND,
  STATUS_CANNOT_BE_CHANGED,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';

import { UpdateUserStatusDTO } from './update-user-status-schema';

export class UpdateUserStatusService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    id: number,
    dto: UpdateUserStatusDTO,
    loggedInUser: IUser,
  ): Promise<string> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    if (loggedInUser.id === id) {
      throw new AppError(STATUS_CANNOT_BE_CHANGED);
    }

    if (user.status === dto.status) {
      throw new AppError(`O status já está definido como "${user.status}".`);
    }

    const status = await this.userRepository.updateStatus(id, dto.status);

    return status;
  }
}
