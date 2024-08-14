import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Invalid request body',
            errors: error.flatten().fieldErrors
        })
    }

    if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
}