import { FastifyReply, FastifyRequest } from 'fastify';

import { AppError } from '@app/errors/app-client';

import { UploadService } from './upload-service';

export class UploadController {
  private uploadService: UploadService;

  constructor(uploadService: UploadService) {
    this.uploadService = uploadService;
  }

  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const file = await req.file({
        limits: {
          fileSize: 5_242_880, // 5mb
        },
      });

      if (!file) {
        return res.status(400).send();
      }

      const { fileName } = await this.uploadService.execute(file);

      const fullUrl = req.protocol.concat('://').concat(req.hostname);
      const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

      return res.status(201).send({ success: true, fileUrl: fileUrl });
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).send({ message: error.message });
      }

      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
