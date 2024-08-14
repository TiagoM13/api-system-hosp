import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { GetUserService } from "./get-user-service";
import { schemaParams } from "../../schemas";

export class GetUserController {
    private getUserService: GetUserService

    constructor(getUserService: GetUserService) {
        this.getUserService = getUserService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { userId } = schemaParams.parse(req.params)

            const user = await this.getUserService.execute(userId)

            return res.send({ success: true, user })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}