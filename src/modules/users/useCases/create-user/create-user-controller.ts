import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";
import { schemaBody } from "@modules/users/schemas";
import { CreateUserService } from "./create-user-service";

export class CreateUserController {
    private createUserService: CreateUserService

    constructor(createUserService: CreateUserService) {
        this.createUserService = createUserService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { name, email, role, image_url } = schemaBody.parse(req.body)

            const user = await this.createUserService.execute({
                name,
                email,
                role,
                image_url,
            });

            return res.status(201).send({ success: true, user })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
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