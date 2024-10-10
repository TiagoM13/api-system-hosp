import nodemailer from 'nodemailer';

import { AppError } from '@app/errors/app-client';
import { getMailClient } from '@shared/configs/mailer';
import { EMAIL_IS_ALREADY_IN_USE } from '@shared/constants/messages';
import { IUser } from '@shared/entities';
import { UserRepository } from '@shared/repositories/implementations';
import {
  generateProvisionalPassword,
  hashPassword,
} from '@shared/utils/generate-password';

import { UserDataType } from '../../schemas';

export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: UserDataType): Promise<IUser> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new AppError(EMAIL_IS_ALREADY_IN_USE);
    }

    const provisionalPassword = generateProvisionalPassword();
    const hashedPassword = await hashPassword(provisionalPassword);

    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const mail = await getMailClient();

    const message = await mail.sendMail({
      from: {
        name: 'Equipe Teste',
        address: 'equipe@example.com',
      },
      to: newUser.email,
      subject: 'Bem-vindo ao Sistema de Gerenciamento Hospitalar!',
      html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                <p>Olá, ${newUser.name}!</p>
                <p>Seja muito bem-vindo ao Sistema de Gerenciamento Hospitalar!</p>
                <p>Seu acesso foi criado com sucesso e estamos felizes em ter você em nossa equipe.</p>
                <p>Para acessar o sistema, use a senha provisória: <strong>${provisionalPassword}</strong></p>
                <p></p>
                <p>Por favor, troque sua senha assim que possível para garantir a segurança do seu acesso.</p>
                <p>Você pode acessar o sistema clicando no link abaixo:</p>
                <p></p>
                <p><a target="_blank" href="${process.env.BASE_URL_WEB}/sign-in">Clique aqui para fazer login</a></p>
                <p></p>
                <p>Caso não tenha solicitado este e-mail, apenas ignore esta mensagem.</p>
                <p></p>
                <p>Abraços,</p>
                <p>Equipe Teste</p>
            </div>
          `.trim(),
    });

    // Remover
    console.error(nodemailer.getTestMessageUrl(message));

    return newUser;
  }
}
