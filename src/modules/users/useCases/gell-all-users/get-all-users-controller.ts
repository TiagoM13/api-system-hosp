import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { GetAllUsersService } from "./get-all-users-service";
import { schemaQuery } from "../../schemas";

export class GetAllUsersController {
    private getAllUsersService: GetAllUsersService

    constructor(getAllUsersService: GetAllUsersService) {
        this.getAllUsersService = getAllUsersService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { name, page, limit } = schemaQuery.parse(req.query);

            const { users, meta } = await this.getAllUsersService.execute({ name, page, items_per_page: limit })

            return res.send({
                success: true,
                users,
                meta
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}