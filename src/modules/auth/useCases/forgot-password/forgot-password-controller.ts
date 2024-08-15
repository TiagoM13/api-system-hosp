import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";
import { schemaBody } from "@modules/auth/schemas";
import { ForgotPasswordService } from "./forgot-password-service";

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

            if (error instanceof ZodError) {
                return res.status(400).send({
                    message: 'Invalid request body',
                    errors: error.flatten().fieldErrors
                })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}