import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { DeleteUserService } from "./delete-user-service";
import { schemaParams } from "../../schemas";

export class DeleteUserController {
    private deleteUserService: DeleteUserService

    constructor(deleteUserService: DeleteUserService) {
        this.deleteUserService = deleteUserService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { userId } = schemaParams.parse(req.params)

            const user = await this.deleteUserService.execute(userId)

            return res.send({ userId: user.id })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(404).send({ message: error.message });
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}