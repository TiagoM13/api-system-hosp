import { FastifyInstance } from "fastify"

import { verifyToken } from "@app/middleware/authenticate"
import {
    createQueryFactory,
    getAllQueriesFactory,
    getQueryFactory,
    updateQueryFactory
} from "@modules/queries/useCases"

const routesQueries = async (app: FastifyInstance) => {
    app.addHook("onRequest", verifyToken)

    app.get("/patients/:patientId/queries", (req, res) => getAllQueriesFactory().handle(req, res))
    app.get("/patients/:patientId/queries/:queryId", (req, res) => getQueryFactory().handle(req, res))
    app.post("/patients/:patientId/queries", (req, res) => createQueryFactory().handle(req, res))
    app.put("/patients/:patientId/queries/:queryId", (req, res) => updateQueryFactory().handle(req, res))
}

export { routesQueries }
