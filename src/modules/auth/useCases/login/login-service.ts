import { app } from "@app/app";
import { AppError } from "@app/errors";
import { EMAIL_INVALID, PASSWORD_INVALID, USER_INACTIVE } from "@shared/constants";
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
            throw new AppError(EMAIL_INVALID);
        }

        const isPasswordValid = await app.bcrypt.compare(password, String(user.password))

        if (!isPasswordValid) {
            throw new AppError(PASSWORD_INVALID);
        }

        if (user.status === "inativo") {
            throw new AppError(USER_INACTIVE, 403)
        }

        const token = app.jwt.sign({
            id: user.id, role: user.role, status: user.status
        });

        const { password: _, ...userWithoutPassword } = user;

        return { token, user: userWithoutPassword };
    }
}