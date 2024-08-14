import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { UpdateUserService } from "./update-user-service";
import { schemaBody, schemaParams } from "../../schemas";

export class UpdateUserController {
    private updateUserService: UpdateUserService

    constructor(updateUserService: UpdateUserService) {
        this.updateUserService = updateUserService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { userId } = schemaParams.parse(req.params)
            const { name, email, status, user_type, image_url } = schemaBody.parse(req.body)

            const updatedUser = await this.updateUserService.execute(userId, {
                name,
                email,
                status,
                user_type,
                image_url
            })

            return res.send({
                success: true,
                user: updatedUser
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}