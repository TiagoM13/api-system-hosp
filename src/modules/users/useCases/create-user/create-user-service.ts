import { AppError } from "@app/errors";
import { IUser } from "@shared/entities";
import { UserRepository } from "@shared/repositories";
import { generateProvisionalPassword, hashPassword } from "@shared/utils";

export class CreateUserService {
    private userRespository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRespository = userRepository
    }

    async execute(data: IUser) {
        const user = await this.userRespository.findByEmail(data.email)

        if (user) {
            throw new AppError("email is already being used.")
        }

        const provisionalPassword = generateProvisionalPassword();
        const hashedPassword = await hashPassword(provisionalPassword);

        const newUser = await this.userRespository.create({
            ...data, password: hashedPassword,
        })

        return newUser
    }
}