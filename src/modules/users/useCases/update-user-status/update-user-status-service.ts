import { AppError } from '@app/errors/app-client';
import { USER_NOT_FOUND } from '@shared/constants/messages';
import { UserRepository } from '@shared/repositories/implementations';

import { UpdateUserStatusDTO } from './update-user-status-schema';

export class UpdateUserStatusService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number, dto: UpdateUserStatusDTO): Promise<string> {
    const user = await this.userRepository.findById(id);

    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    const status = await this.userRepository.updateStatus(id, dto.status);

    return status;
  }
}
