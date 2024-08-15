import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";
import { schemaParamsQueries } from "@modules/queries/schemas";
import { GetQueryService } from "./get-query-service";

export class GetQueryController {
    private getQueryService: GetQueryService;

    constructor(getQueryService: GetQueryService) {
        this.getQueryService = getQueryService;
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { queryId, patientId } = schemaParamsQueries.parse(req.params)

            const query = await this.getQueryService.execute(queryId, patientId)

            return res.status(200).send({
                success: true,
                query
            })
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

            return res.status(500).send({ error: "Internal Server Error" })
        }
    }
}