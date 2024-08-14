import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { schemaParams } from "@modules/patients/schemas";
import { GetPatientService } from "./get-patient-service";

export class GetPatientController {
    private getPatientService: GetPatientService

    constructor(getPatientService: GetPatientService) {
        this.getPatientService = getPatientService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { patientId } = schemaParams.parse(req.params);

            const patient = await this.getPatientService.execute(patientId)

            return res.status(200).send({
                success: true,
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