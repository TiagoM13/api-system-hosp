import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { ChangePasswordUserService } from "./change-password-user-service";
import { schemaChangePasswordBody, schemaParams } from "../../schemas";

export class ChangePasswordUserController {
    private changePasswordUserService: ChangePasswordUserService

    constructor(changePasswordUserService: ChangePasswordUserService) {
        this.changePasswordUserService = changePasswordUserService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { userId } = schemaParams.parse(req.params)
            const { password, confirmPassword } = schemaChangePasswordBody.parse(req.body)

            await this.changePasswordUserService.execute(userId, password, confirmPassword)

            return res.send({
                success: true,
                message: "Password is altered success"
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}