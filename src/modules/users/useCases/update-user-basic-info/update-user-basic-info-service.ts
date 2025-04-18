import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import {
  EMAIL_IS_ALREADY_IN_USE,
  UNAUTHORIZED,
  USER_NOT_FOUND,
} from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { hashPassword } from '@shared/utils';

import { UpdateUserBasicInfoDTO } from './update-user-basic-info-schema';

export class UpdateUserBasicInfoService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(
    id: string,
    dto: UpdateUserBasicInfoDTO,
    loggedInUser: IUser,
  ): Promise<IUser> {
    if (loggedInUser.id !== id) {
      throw new AppError(UNAUTHORIZED, 403);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    if (dto.email) {
      const emailInUse = await this.userRepository.findByEmail(dto.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new AppError(EMAIL_IS_ALREADY_IN_USE);
      }
    }

    const hashedPassword = await hashPassword(String(dto.password));
    const udpateUser = await this.userRepository.updateUserBasicInfo(id, dto);

    return { ...udpateUser, password: hashedPassword };
  }
}
