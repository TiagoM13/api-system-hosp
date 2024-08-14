import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPatientsService } from "./get-all-patients-service";
import { AppError } from "@app/errors";
import { schemaQuery } from "@modules/patients/schemas";

export class GetAllPatientsController {
    private getAllPatientsService: GetAllPatientsService

    constructor(getAllPatientsService: GetAllPatientsService) {
        this.getAllPatientsService = getAllPatientsService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { name, page, limit } = schemaQuery.parse(req.query);

            const { patients, meta } = await this.getAllPatientsService.execute({ name, page, items_per_page: limit })

            return res.status(200).send({
                success: true,
                patients,
                meta
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}