import { type FastifyReply } from 'fastify';

import { BaseController } from '@app/infra/http/controller/baseController';

import { UploadService } from './upload-service';

export class UploadController extends BaseController {
  constructor(private uploadService: UploadService) {
    super();
  }

  protected async handle(): Promise<FastifyReply> {
    const file = await this.request.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    });

    if (!file) {
      return this.response.status(400).send();
    }

    const fileName = await this.uploadService.execute(file);

    const fullUrl = this.request.protocol
      .concat('://')
      .concat(this.request.hostname);
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

    return this.created({ success: true, fileUrl });
  }
}
