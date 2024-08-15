import { FastifyInstance } from "fastify"

import { verifyToken } from "@app/middleware"
import {
    createPatientFactory,
    getAllPatientsFactory,
    getPatientFactory,
    updatePatientFactory
} from "@modules/patients/useCases"

const routesPatients = async (app: FastifyInstance) => {
    app.addHook("onRequest", verifyToken)

    app.post("/patients", (req, res) => createPatientFactory().handle(req, res))
    app.get("/patients", (req, res) => getAllPatientsFactory().handle(req, res))
    app.get("/patients/:patientId", (req, res) => getPatientFactory().handle(req, res))
    app.put("/patients/:patientId", (req, res) => updatePatientFactory().handle(req, res))
}

export { routesPatients }
