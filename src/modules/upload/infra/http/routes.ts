import { FastifyInstance } from "fastify";

import { verifyToken } from "@app/infra/http/middleware/authenticate";
import { uploadFactory } from "@modules/upload/useCases";

export const routeUpload = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyToken)

  app.post("/upload", (req, res) => uploadFactory().handle(req, res))
}
