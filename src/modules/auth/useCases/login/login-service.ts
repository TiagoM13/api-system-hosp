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
            throw new AppError("Invalid credentials");
        }

        const isPasswordValid = await app.bcrypt.compare(password, String(user.password))

        if (!isPasswordValid) {
            throw new AppError("Invalid credentials");
        }

        const token = app.jwt.sign({
            id: user.id, user_type: user.user_type,
        });

        const { password: _, ...userWithoutPassword } = user;

        return { token, user: userWithoutPassword };
    }
}