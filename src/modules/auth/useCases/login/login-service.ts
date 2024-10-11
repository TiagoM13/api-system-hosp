/* eslint-disable @typescript-eslint/no-unused-vars */
import { app } from '@app/app';
import { AppError } from '@app/errors/app-client';
import {
  EMAIL_INVALID,
  PASSWORD_INVALID,
  USER_INACTIVE,
} from '@shared/constants/messages';
import { UserRepository } from '@shared/repositories/implementations';

import { AuthenticationType } from '../../schemas';

export class LoginService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: AuthenticationType) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(EMAIL_INVALID);
    }

    const isPasswordValid = await app.bcrypt.compare(
      password,
      String(user.password),
    );

    if (!isPasswordValid) {
      throw new AppError(PASSWORD_INVALID);
    }

    if (user.status === 'inativo') {
      throw new AppError(USER_INACTIVE, 403);
    }

    const token = app.jwt.sign(
      {
        id: user.id,
        role: user.role,
        status: user.status,
      },
      {
        expiresIn: '4h',
      },
    );

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}
