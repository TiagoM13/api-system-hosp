import nodemailer from 'nodemailer';

import { AppError } from '@app/errors/app-client';
import { UserRepository } from '@modules/users/repositories/user-repository';
import { sendWelcomeEmail } from '@shared/config/mailer/emails/welcome';
import { EMAIL_IS_ALREADY_IN_USE } from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import {
  generateProvisionalPassword,
  hashPassword,
} from '@shared/utils/generate-password';

import { CreateUserDTO } from './create-user-schema';

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: CreateUserDTO): Promise<IUser> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (user) {
      throw new AppError(EMAIL_IS_ALREADY_IN_USE);
    }

    const provisionalPassword = generateProvisionalPassword();
    const hashedPassword = await hashPassword(provisionalPassword);

    const newUser = await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const message = await sendWelcomeEmail({
      user: newUser,
      password: provisionalPassword,
    });

    // TO-DO
    console.error(nodemailer.getTestMessageUrl(message));

    return newUser;
  }
}
