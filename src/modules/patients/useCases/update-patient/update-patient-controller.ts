import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "@app/errors";
import { schemaBody, schemaParams } from "@modules/patients/schemas";
import { UpdatePatientService } from "./update-patient-service";

export class UpdatePatientController {
    private updatePatientService: UpdatePatientService

    constructor(updatePatientService: UpdatePatientService) {
        this.updatePatientService = updatePatientService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { patientId } = schemaParams.parse(req.params)
            const data = schemaBody.parse(req.body)

            const updatedPatient = await this.updatePatientService.execute(patientId, data)

            return res.status(201).send({
                succes: true,
                patient: updatedPatient
            })
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}