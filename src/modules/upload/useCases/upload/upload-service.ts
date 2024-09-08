import { MultipartFile } from '@fastify/multipart';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';
import util from 'node:util';

import { AppError } from '@app/errors/app-client';

const pump = util.promisify(pipeline);

export class UploadService {
  async execute(uploadData: MultipartFile | undefined) {
    if (!uploadData) {
      throw new AppError('No file uploaded');
    }

    if (!uploadData.mimetype.startsWith('image/')) {
      throw new AppError('Only image files are allowed');
    }

    const fileId = randomUUID();
    const extension = path.extname(uploadData.filename);

    const fileName = fileId.concat(extension);

    const writeStream = fs.createWriteStream(
      path.resolve(__dirname, '../../../../', 'uploads', fileName),
    );

    await pump(uploadData.file, writeStream);

    return { fileName };
  }
}
