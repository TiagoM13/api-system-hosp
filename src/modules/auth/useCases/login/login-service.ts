import { app } from "@app/app";
import { AppError } from "@app/errors";
import { UserRepository } from "@shared/repositories";

interface ILoginService {
    email: string;
    password: string;
}

export class LoginService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }: ILoginService) {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("E-mail inválido");
        }

        const isPasswordValid = await app.bcrypt.compare(password, String(user.password))

        if (!isPasswordValid) {
            throw new AppError("Senha inválida");
        }

        if (user.status === "inativo") {
            throw new AppError("Usuário inativo! Você está sem acesso no momento", 403)
        }

        const token = app.jwt.sign({
            id: user.id, role: user.role, status: user.status
        });

        const { password: _, ...userWithoutPassword } = user;

        return { token, user: userWithoutPassword };
    }
}