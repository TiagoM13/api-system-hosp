import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { USER_NOT_FOUND } from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { hashPassword } from '@shared/utils/generate-password';

import { ChangePasswordUserDTO } from './change-password-user-schema';

export class ChangePasswordUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string, dto: ChangePasswordUserDTO): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    const hashedPassword = await hashPassword(dto.password);

    return await this.userRepository.changePassword(String(user.id), {
      ...user,
      password: hashedPassword,
    });
  }
}
