import { FastifyInstance } from "fastify";

import { checkPermissions, verifyToken } from "@app/middleware";
import { createUserFactory, deleteUserFactory, getAllUsersFactory, getUserFactory, updateUserFactory, changePasswordUserFactory } from "../../useCases";

const userRoutes = async (app: FastifyInstance) => {
    app.addHook("onRequest", verifyToken)

    app.get("/users", { preHandler: checkPermissions([0]) }, (req, res) => getAllUsersFactory().handle(req, res))
    app.get("/users/:userId", { preHandler: checkPermissions([0, 1, 2]) }, (req, res) => getUserFactory().handle(req, res))
    app.post("/users", { preHandler: checkPermissions([0]) }, (req, res) => createUserFactory().handle(req, res))
    app.put("/users/:userId", { preHandler: checkPermissions([0, 1, 2]) }, (req, res) => updateUserFactory().handle(req, res))
    app.patch("/users/:userId/change-password", { preHandler: checkPermissions([0, 1, 2]) }, (req, res) => changePasswordUserFactory().handle(req, res))
    app.delete("/users/:userId", { preHandler: checkPermissions([0]) }, (req, res) => deleteUserFactory().handle(req, res))
}

export { userRoutes }