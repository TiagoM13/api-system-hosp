import { FastifyReply, FastifyRequest } from "fastify";
import { ForgotPasswordService } from "./forgot-password-service";
import { AppError } from "@app/errors";
import { schemaBody } from "@modules/auth/schemas";

export class ForgotPasswordController {
    private forgotPasswordService: ForgotPasswordService

    constructor(forgotPasswordService: ForgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email } = schemaBody.parse(req.body)

            const user = await this.forgotPasswordService.execute(email)

            return res.status(201).send({ success: true, email: user.email })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}