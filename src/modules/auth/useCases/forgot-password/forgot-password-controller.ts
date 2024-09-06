import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors/app-client";
import { forgotPasswordSchema } from "@modules/auth/schemas";
import { ForgotPasswordService } from "./forgot-password-service";

export class ForgotPasswordController {
  private forgotPasswordService: ForgotPasswordService

  constructor(forgotPasswordService: ForgotPasswordService) {
    this.forgotPasswordService = forgotPasswordService
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { email } = forgotPasswordSchema.parse(req.body)

      await this.forgotPasswordService.execute(email)

      return res.status(201).send({ success: true, message: 'Uma nova senha foi enviada para seu endereço de e-mail.' })
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message })
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
