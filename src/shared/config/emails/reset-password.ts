import { IUser } from '@shared/entities';

import { getMailClient } from '../mailer';

interface SendResetPasswordEmailProps {
  user: IUser;
  temporaryPassword: string;
}

export const sendResetPasswordEmail = async ({
  user,
  temporaryPassword,
}: SendResetPasswordEmailProps) => {
  const mail = await getMailClient();

  const sender = {
    name: 'Equipe Suporte',
    address: 'suporte@example.com',
  };

  const message = await mail.sendMail({
    from: sender,
    to: user.email,
    subject: 'Redefinição de senha - Sua nova senha está disponível',
    html: `
          <section style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
            <p>Olá, <strong>${user.name}</strong>!</p>
            <p>Recebemos seu pedido para redefinir a senha e estamos aqui para ajudar!</p>
            <p>Use a senha provisória abaixo para acessar sua conta novamente:</p>
            <p style="font-size: 18px; font-weight: bold; color: #000;">${temporaryPassword}</p>
            <p>Não se esqueça de trocar essa senha assim que possível para manter sua conta segura.</p>
            <p>Você pode acessar o sistema clicando no link abaixo:</p>
            <p>
              <a
                href="${process.env.BASE_URL_WEB}/sign-in"
                target="_blank"
                style="color: #007bff; text-decoration: none; font-weight: bold;"
              >
                Clique aqui para fazer login
              </a>
            </p>
            <p>Caso você não tenha solicitado a redefinição de senha, pode ignorar esta mensagem sem preocupações.</p>
            <footer style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 14px; color: #555;">
              <p>Estamos sempre aqui para ajudar!</p>
              <p>Abraços,</p>
              <p><strong>Equipe Suporte</strong></p>
            </footer>
          </section>
        `.trim(),
  });

  return message;
};
