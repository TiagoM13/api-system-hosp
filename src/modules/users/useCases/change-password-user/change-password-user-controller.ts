import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors/app-client";
import { schemaChangePasswordBody, schemaParams } from "@modules/users/schemas";
import { ChangePasswordUserService } from "./change-password-user-service";

export class ChangePasswordUserController {
  private changePasswordUserService: ChangePasswordUserService

  constructor(changePasswordUserService: ChangePasswordUserService) {
    this.changePasswordUserService = changePasswordUserService
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userId } = schemaParams.parse(req.params)
      const { password, confirm_password } = schemaChangePasswordBody.parse(req.body)

      await this.changePasswordUserService.execute(userId, password, confirm_password)

      return res.status(201).send({
        success: true,
        message: "Sua senha foi alterada com sucesso"
      })
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send({ message: error.message });
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
