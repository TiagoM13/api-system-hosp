import { Status } from '@prisma/client';
import nodemailer from 'nodemailer';

import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { sendResetPasswordEmail } from '@shared/config/mailer/emails/reset-password';
import { USER_INACTIVE, USER_NOT_FOUND } from '@shared/constants/messages';
import {
  generateProvisionalPassword,
  hashPassword,
} from '@shared/utils/generate-password';

import { ForgetPasswordDTO } from './forgot-password-schema';

export class ForgotPasswordService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email }: ForgetPasswordDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(USER_NOT_FOUND, 404);
    }

    if (user.status === Status.INACTIVE) {
      throw new AppError(USER_INACTIVE, 403);
    }

    const provisionalPassword = generateProvisionalPassword();
    const hashedPassword = await hashPassword(provisionalPassword);

    await this.userRepository.update(user.id!, {
      ...user,
      password: hashedPassword,
    });

    // TO-DO
    console.log({ provisionalPassword });

    const message = await sendResetPasswordEmail({
      user,
      temporaryPassword: provisionalPassword,
    });

    // TO-DO
    console.error(nodemailer.getTestMessageUrl(message));
  }
}
