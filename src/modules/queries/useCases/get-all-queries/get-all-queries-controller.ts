import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { GetAllQueriesService } from "./get-all-queries-service";
import { schemaParams, schemaQuery } from "@modules/queries/schemas";

export class GetAllQueriesController {
    private getAllQueriesService: GetAllQueriesService;

    constructor(getAllQueriesService: GetAllQueriesService) {
        this.getAllQueriesService = getAllQueriesService;
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { patientId } = schemaParams.parse(req.params)
            const { page, items_per_page, end_date, start_date, type_query } = schemaQuery.parse(req.query);

            const { queries, meta } = await this.getAllQueriesService.execute({ patient_id: patientId, page, items_per_page, end_date, start_date, type_query })

            return res.status(200).send({
                success: true,
                queries,
                meta
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).send({ message: error.message })
            }

            return res.status(500).send({ error: "Internal Server Error" })
        }
    }
}