import { FastifyReply, FastifyRequest } from "fastify";
import { UploadService } from "./upload-service";
import { AppError } from "@app/errors";

export class UploadController {
    private uploadService: UploadService

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const file = await req.file()

            const uploadPath = await this.uploadService.execute(file)

            return res.send({ success: true, filePath: uploadPath });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message})
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}