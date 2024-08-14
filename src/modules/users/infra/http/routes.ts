import { FastifyInstance } from "fastify";

import { verifyAdmin, verifyToken } from "@app/middleware";
import { createUserFactory, deleteUserFactory, getAllUsersFactory, getUserFactory, updateUserFactory, changePasswordUserFactory } from "../../useCases";

const userRoutes = async (app: FastifyInstance) => {
    app.addHook("onRequest", verifyToken)

    app.get("/users", { preHandler: verifyAdmin }, (req, res) => getAllUsersFactory().handle(req, res))
    app.get("/users/:userId", { preHandler: verifyAdmin }, (req, res) => getUserFactory().handle(req, res))
    app.post("/users", { preHandler: verifyAdmin }, (req, res) => createUserFactory().handle(req, res))
    app.put("/users/:userId", { preHandler: verifyAdmin }, (req, res) => updateUserFactory().handle(req, res))
    app.patch("/users/:userId/change-password", { preHandler: verifyAdmin }, (req, res) => changePasswordUserFactory().handle(req, res))
    app.delete("/users/:userId", { preHandler: verifyAdmin }, (req, res) => deleteUserFactory().handle(req, res))
}

export { userRoutes }