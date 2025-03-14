import { Status } from '@prisma/client';

import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { STATUS_LABELS } from '@shared/constants/labels';
import {
  USER_NOT_FOUND,
  STATUS_CANNOT_BE_CHANGED,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';

import { UpdateUserStatusDTO } from './update-user-status-schema';

export class UpdateUserStatusService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    id: string,
    dto: UpdateUserStatusDTO,
    loggedInUser: IUser,
  ): Promise<Status> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    if (loggedInUser.id === id) {
      throw new AppError(STATUS_CANNOT_BE_CHANGED);
    }

    if (user.status === dto.status) {
      throw new AppError(
        `O status já está definido como "${STATUS_LABELS[user.status]}".`,
      );
    }

    const status = await this.userRepository.updateStatus(id, dto.status);

    return status;
  }
}
