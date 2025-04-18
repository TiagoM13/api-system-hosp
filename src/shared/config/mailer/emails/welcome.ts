import { IUser } from '@shared/entities';

import { getMailClient } from '..';

interface SendWelcomeEmailProps {
  user: IUser;
  password: string;
}

export const sendWelcomeEmail = async ({
  user,
  password,
}: SendWelcomeEmailProps) => {
  const mail = await getMailClient();

  const sender = {
    name: 'Equipe Suporte',
    address: 'suporte@example.com',
  };

  const message = await mail.sendMail({
    from: sender,
    to: user.email,
    subject: 'Bem-vindo ao Sistema de Gerenciamento Hospitalar!',
    html: `
          <section style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
            <p>Olá, <strong>${user.name}</strong>!</p>
            <p>Seja muito bem-vindo ao <strong>Sistema de Gerenciamento Hospitalar</strong>!</p>
            <p>Seu acesso foi criado com sucesso e estamos felizes em ter você em nossa equipe.</p>
            <p>Para acessar o sistema, utilize a senha provisória abaixo:</p>
            <p style="font-size: 18px; font-weight: bold; color: #000;">${password}</p>
            <p>Recomendamos que você troque sua senha assim que possível para garantir a segurança do seu acesso.</p>
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
            <p>Caso você não tenha solicitado este e-mail, apenas ignore esta mensagem.</p>
            <footer style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 14px; color: #555;">
              <p>Abraços,</p>
              <p><strong>Equipe Suporte</strong></p>
            </footer>
          </section>
        `.trim(),
  });

  return message;
};
