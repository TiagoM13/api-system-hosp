import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { USER_NOT_FOUND } from '@shared/constants/messages';
import { IUser } from '@shared/entities';

export class GetUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    return user;
  }
}
