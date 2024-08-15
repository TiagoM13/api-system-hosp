import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";
import { schemaBody, schemaParamsQueries } from "@modules/queries/schemas";
import { UpdateQueryService } from "./update-query-service";

export class UpdateQueryController {
    private updateQueryService: UpdateQueryService;

    constructor(updateQueryService: UpdateQueryService) {
        this.updateQueryService = updateQueryService;
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { queryId, patientId } = schemaParamsQueries.parse(req.params)
            const { type_query, diagnosis, exam } = schemaBody.parse(req.body)

            const query = await this.updateQueryService.execute(queryId, patientId, { type_query, diagnosis, exam, patient_id: patientId })

            return res.status(201).send({
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