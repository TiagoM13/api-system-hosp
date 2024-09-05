import nodemailer from 'nodemailer';
import { AppError } from "@app/errors";

import { USER_INACTIVE, USER_NOT_FOUND } from "@shared/constants";
import { generateProvisionalPassword, hashPassword } from "@shared/utils";
import { UserRepository } from "@shared/repositories";
import { getMailClient } from "@shared/lib";

export class ForgotPasswordService {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError(USER_NOT_FOUND, 404)
        }

        if (user.status === "inativo") {
            throw new AppError(USER_INACTIVE, 403)
        }

        const provisionalPassword = generateProvisionalPassword();
        const hashedPassword = await hashPassword(provisionalPassword);

        await this.userRepository.update(user.id!, { ...user, password: hashedPassword })

        const mail = await getMailClient()

        const message = await mail.sendMail({
            from: {
                name: "Equipe Teste",
                address: "equipe@example.com",
            },
            to: user.email,
            subject: "Sua nova senha já está disponivel",
            html: `
            <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
                <p>Olá, ${user.name}!</p>
                <p>Recebemos seu pedido para redefinir a senha e estamos aqui para ajudar!</p>
                <p>Use a senha provisória abaixo para acessar sua conta novamente:</p>
                <p><strong>${provisionalPassword}</strong></p>
                <p>Não se esqueça de trocar essa senha assim que possível para manter sua conta segura.</p>
                <p>Você pode acessar o sistema clicando no link abaixo:</p>
                <p><a target="_blank" href="${process.env.BASE_URL_WEB}/sign-in">Clique aqui para fazer login</a></p>
                <p>Caso você não tenha solicitado a redefinição de senha, pode ignorar esta mensagem sem preocupações.</p>
                <p>Estamos sempre aqui para ajudar!</p>
                <p>Abraços,</p>
                <p>Equipe Teste</p>
            </div>
          `.trim()
        })

        // Remover
        console.error(nodemailer.getTestMessageUrl(message))
    }
}