import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePatientService } from "./create-patient-service";
import { AppError } from "@app/errors";
import { schemaBody } from "@modules/patients/schemas";

export class CreatePatientController {
    private createPatientService: CreatePatientService

    constructor(createPatientService: CreatePatientService) {
        this.createPatientService = createPatientService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = schemaBody.parse(req.body)

            const patient = await this.createPatientService.execute(data)

            return res.status(201).send({
                succes: true,
                patient
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}