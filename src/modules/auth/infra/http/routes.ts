import { FastifyInstance } from "fastify";

import { forgotPasswordFactory, loginFactory } from "@modules/auth/useCases";

const authRoutes = async (app: FastifyInstance) => {
  app.post("/auth/sign-in", (req, res) => loginFactory().handle(req, res))
  app.post("/auth/forgot-password", (req, res) => forgotPasswordFactory().handle(req, res))
}

export { authRoutes }
